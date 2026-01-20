"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ResultCard from "@/src/components/ResultCard";
import { ArrowLeft, ArrowDownToLine, Heart } from "lucide-react";
import { RemoveLikedItem, AddLikedItem } from "@/src/store/features/collectionSlice";
import Masonry from "react-masonry-css";

const page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const results = useSelector((state) => state.search.results);
  const moreLikeThis = results.filter((item) => item._id !== id);
  const data = results.find((item) => item._id === id);
  console.log(id);
  if (!data) return <div>waait</div>
  const liked = useSelector((state) => state.collection.liked);
  const isLiked = liked.some((item) => item._id === data._id);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  const handleDownload = () => {
    const filename = `${data.title || "image"}.jpg`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(data.download)}&filename=${filename}`;
    window.open(downloadUrl, "_blank");
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(RemoveLikedItem(data));
    }
    else {
      dispatch(AddLikedItem(data));
    }
  }
  return (
    <div className='text-black p-4'>
      <Link href={'/'} className="flex"><div className="border p-2 my-2 flex gap-2 items-center"><ArrowLeft />Go Home</div></Link>
      <img src={data.img_url} alt={data.title} className="w-full" />
      <p>{data.description}</p>
      <div className=" flex gap-2 items-center">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 flex gap-2 items-center"
        >
          <ArrowDownToLine />
          Download
        </button>
        <button onClick={handleLike} className={`flex items-center gap-1 p-2 border ${isLiked?'bg-white text-black':'bg-black text-white'} w-40 `}>
          <Heart />
          {isLiked ? "Unlike" : "Like"}
        </button>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {moreLikeThis.map((item, index) => (
          <ResultCard key={index} data={item} />
        ))}
      </Masonry>
    </div>
  )
}

export default page