import { Search, Image, FilePlay } from "lucide-react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
const Header = ({ activeTab, setActiveTab, handleSearch, search, setSearch }) => {
  const inputRef =useRef(null);
  const dispatch = useDispatch();
 
   useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore special keys
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
  return (
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-4 items-center">
        <input  ref={inputRef} type="text" className='border p-2' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="h-full border p-2 hover:cursor-pointer"><Search /></button>
      </form>
      <div className="flex items-center gap-4">
        <button onClick={() => {
          dispatch(setActiveTab("photo"));
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'photo' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}

          <Image className="relative z-10" /><span className="relative z-10">photo</span>
        </button>

        <button onClick={() => {
          dispatch(setActiveTab("video"));
        }} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'video' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}
          <FilePlay className="relative z-10" />
          <span className="relative z-10">
            Video
          </span>
        </button>
      </div>
    </div>
  )
}

export default Header