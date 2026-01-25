import { Search, Image, FilePlay } from "lucide-react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import { X } from 'lucide-react';
const Header = ({ setSuggestion, suggestion, activeTab, setActiveTab, handleSearch, search, setSearch }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [inputFocused, setInputFocused] = useState(false);
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
    if (search.trim().length < 2) {
      setSuggestion([]);
      return;
    }

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
      }} className="flex items-center">
        <div className="relative">
          <input ref={inputRef} type="text" className='border-2 border-[#30364F] rounded-l-full focus:outline-0 px-5 p-2' placeholder="Search anything..." value={search} onChange={(e) => {
            setSearch(e.target.value);
            setActiveIndex(-1);//resett
          }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={(e) => {
              if (!suggestion.length) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) => prev < suggestion.length - 1 ? prev + 1 : 0);
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => prev > 0 ? prev - 1 : suggestion.length - 1);
              }
              if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                setSearch(suggestion[activeIndex]);
                setSuggestion([]);
                setActiveIndex(-1);
              }
              if (e.key === "Escape") {
                setSuggestion([]);
                setActiveIndex(-1);
              }
            }} />
          <AnimatePresence>
            {inputFocused && suggestion.length > 0 && (
              <motion.ul key="inputfocus" variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
                initial="hidden" animate="visible" className="absolute left-0 right-0 z-20">
                {suggestion.map((item, index) => (
                  <motion.li variants={
                    {
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }
                  }
                    transition={{ duration: 0.1 }}
                    key={`sugg-${index}`} onClick={() => {
                      setSearch(item);
                      setSuggestion([]);
                      setActiveIndex(-1);
                      inputRef.current?.focus();
                    }} className={`w-full p-2 px-4 cursor-pointer ${index === activeIndex
                      ? "bg-stone-400"
                      : "bg-stone-200 hover:bg-stone-300"
                      }`}>{item}</motion.li>
                ))}
              </motion.ul>
            )}

            {search.length > 2 && (
              <motion.div key='searchcloser' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer" onClick={() => setSearch('')}><X /></motion.div>
            )}
          </AnimatePresence>
        </div>
        <button type="submit" className="h-full border-2 border-l-0 rounded-r-full border-[#30364F] p-2 hover:cursor-pointer bg-[#30364F] text-white"><Search /></button>
      </form>
      <div className="flex items-center gap-4 text-sm">
        <Button variant="outlined" size="small" sx={{
          color: "#30364F",
          borderColor: "#30364F",
          "&:hover": {
            borderColor: "#30364F",
            backgroundColor: "rgba(255, 87, 34, 0.04)",
          },
        }} onClick={() => {
          if (activeTab !== 'photo') {
            dispatch(setActiveTab("photo"));
          }
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer border">
          {activeTab === 'photo' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}

          <Image size={16} className="relative z-10" /><span className="relative z-10 sm:block hidden">photo</span>
        </Button>

        <Button variant="outlined" size="small" sx={{
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
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'video' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}
          <FilePlay size={16} className="relative z-10" />
          <span className="relative z-10 sm:block hidden">
            Video
          </span>
        </Button>
      </div>
    </div>
  )
}

export default Header