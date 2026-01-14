import { Search, Image, FilePlay } from "lucide-react";
import { useDispatch } from "react-redux";
const Header = ({ activeTab, setActiveTab, handleSearch, search, setSearch }) => {
  const dispatch=useDispatch();
  return (
    <div className="p-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-1 items-center">
        <input type="text" className='border ' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit"><Search /></button>
      </form>
      <div className="flex items-center gap-4">
        <button onClick={() => {
          dispatch(setActiveTab("photo"));
        }} className={`flex gap-1 items-center ${activeTab === "photo" ? "underline" : ''}`}>
          <Image />photo
        </button>

        <button onClick={() => {
          dispatch(setActiveTab("video"));
        }} className={`flex gap-1 items-center ${activeTab === "video" ? "underline" : ''}`}>
          <FilePlay />
          Video
        </button>
      </div>
    </div>
  )
}

export default Header