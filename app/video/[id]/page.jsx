"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ResultCard from "@/src/components/ResultCard";
import { AddLikedItem, RemoveLikedItem } from "@/src/store/features/collectionSlice";

const page = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const moreLikeThis = results.filter((item) => item._id !== id);
    const liked = useSelector((state) => state.collection.liked);
    const data = results.find((item) => item._id == id);
    const isLiked = liked.some((item) => item._id === data._id)
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
        <div>
            <Link href={'/'}>Go back</Link>
            <video
                width="640"
                height="360"
                autoPlay
                loop
                playsInline
                controls
            >
                <source src={data.video_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{data.thumb_description}</p>
            <button onClick={handleLike}>
                {isLiked ? "Unlike" : "Like"}
            </button>
            <a href={data.video_url} download>download</a>
            {moreLikeThis.map((item, index) => (
                <ResultCard key={index} data={item} />
            ))}
        </div>
    )
}

export default page