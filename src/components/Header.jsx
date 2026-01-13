import { Search, Image, FilePlay } from "lucide-react";

const Header = ({ activeTab, setActiveTab, dispatch, setPageCount, handleSearch, search, setSearch }) => {
  return (
    <div className="p-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-1 items-center">
        <input type="text" className='border ' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch} type="submit"><Search /></button>
      </form>
      <div className="flex items-center gap-4">
        <button onClick={() => {
          setPageCount(1);
          dispatch(setActiveTab("photo"));
        }} className={`flex gap-1 items-center ${activeTab === "photo" ? "underline" : ''}`}>
          <Image />photo
        </button>

        <button onClick={() => {
          setPageCount(1);
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