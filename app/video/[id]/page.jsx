"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ResultCard from "@/src/components/ResultCard";
import { AddLikedItem, RemoveLikedItem } from "@/src/store/features/collectionSlice";
import { ArrowLeft, Heart } from "lucide-react";
import Masonry from "react-masonry-css";

const page = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const moreLikeThis = results.filter((item) => item._id !== id);
    const liked = useSelector((state) => state.collection.liked);
    const data = results.find((item) => item._id == id);
    const isLiked = liked.some((item) => item._id === data._id);
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    console.log(id);
    const handleLike = () => {
        if (isLiked) {
            dispatch(RemoveLikedItem(data))
            console.log("true");
            console.log(liked);
        }
        else {
            dispatch(AddLikedItem(data));
            console.log("false");
            console.log(liked);

        }
    }
    if (!data) return <div>waait</div>
    return (
        <div className="p-4">
            <Link href={'/'} className="flex"><div className="border p-2 my-2 flex gap-2 items-center"><ArrowLeft />Go Home</div></Link>
            <video
                className="w-full h-auto"
                autoPlay
                loop
                playsInline
                controls
            >
                <source src={data.video_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{data.thumb_description}</p>
            <div className="flex gap-2 items-center">
                <a href={data.video_url} download className="border p-2">download</a>
                <button onClick={handleLike} className={`flex items-center gap-1 p-2 border ${isLiked ? 'bg-white text-black' : 'bg-black text-white'} w-40 `}>
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