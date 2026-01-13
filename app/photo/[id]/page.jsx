"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ResultCard from "@/src/components/ResultCard";
import { RemoveLikedItem, AddLikedItem } from "@/src/store/features/collectionSlice";
const page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const results = useSelector((state) => state.search.results);
  const moreLikeThis = results.filter((item) => item._id !== id);
  const data = results.find((item) => item._id === id);
  console.log(id);
  if (!data) return <div>waait</div>
  const liked = useSelector((state) => state.collection.liked);
  const isLiked = liked.some((item) => item._id === data._id)
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
    <div className='text-white'>
      <Link href={'/'}><div>Go Back</div></Link>
      <img src={data.img_url} alt={data.title} />
      <p>{data.description}</p>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Download
      </button>
      <button onClick={handleLike}>
        {isLiked ? "Unlike" : "Like"}
      </button>
      {moreLikeThis.map((item, index) => (

        <ResultCard key={index} data={item} />
      ))}
    </div>
  )
}

export default page