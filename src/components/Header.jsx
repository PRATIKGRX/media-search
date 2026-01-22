import { Search, Image, FilePlay } from "lucide-react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';

const Header = ({ setSuggestion, suggestion, activeTab, setActiveTab, handleSearch, search, setSearch }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        e.key.length !== 1
      ) return;
      // Don't refocus if already typing in an input
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) return;

      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  async function fetchSuggestion(query) {
    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSuggestion(data.suggestions || []);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestion(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-4 items-center">
        <div className="relative">
          <input ref={inputRef} type="text" className='border p-2' value={search} onChange={(e) => {
            setSearch(e.target.value);
            setActiveIndex(-1);//resett
          }}
          onKeyDown={(e)=>{
            if(!suggestion.length) return;
            if(e.key === "ArrowDown"){
              e.preventDefault();
              setActiveIndex((prev)=>prev<suggestion.length-1? prev+1:0);
            }
            if(e.key==="ArrowUp"){
              e.preventDefault();
              setActiveIndex((prev)=>prev>0?prev-1:suggestion.length-1);
            }
            if(e.key==="Enter"&& activeIndex>=0){
              e.preventDefault();
              setSearch(suggestion[activeIndex]);
              setSuggestion([]);
              setActiveIndex(-1);
            }
            if(e.key==="Escape"){
              setSuggestion([]);
              setActiveIndex(-1);
            }
          }} />
          <ul className="absolute left-0 right-0 z-20">
            {suggestion.map((item, index) => (
              <li key={index} onClick={() => {
                setSearch(item);
                setSuggestion([]);
                setActiveIndex(-1);
                inputRef.current?.focus();
              }} className={`w-full p-2 cursor-pointer ${
        index === activeIndex
          ? "bg-stone-400"
          : "bg-stone-200 hover:bg-stone-300"
      }`}>{item}</li>
            ))}
          </ul>
        </div>
        <button type="submit" className="h-full border p-2 hover:cursor-pointer"><Search /></button>
      </form>
      <div className="flex items-center gap-4">
        <Button variant="outlined" onClick={() => {
          if (activeTab !== 'photo') {
            dispatch(setActiveTab("photo"));
          }
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'photo' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}

          <Image className="relative z-10" /><span className="relative z-10 sm:block hidden">photo</span>
        </Button>

        <Button variant="outlined" sx={{
          color: "#ff5722",
          borderColor: "#ff5722",
          "&:hover": {
            borderColor: "#e64a19",
            backgroundColor: "rgba(255, 87, 34, 0.04)",
          },
        }} onClick={() => {
          if (activeTab !== 'video') {
            dispatch(setActiveTab("video"));
          }
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer ring-red-500">
          {activeTab === 'video' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}
          <FilePlay className="relative z-10" />
          <span className="relative z-10 sm:block hidden">
            Video
          </span>
        </Button>
      </div>
    </div>
  )
}

export default Header