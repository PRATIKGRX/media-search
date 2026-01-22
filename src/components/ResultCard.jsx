import Link from "next/link"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
const ResultCard = ({ data }) => {
    const activeTab = useSelector((state) => state.search.activeTab);
    const routeMap = {
        photo: "photo",
        video: "video",
        gif: "gif"
    };
    const href = `/${routeMap[activeTab]}/${data._id}`;
    const [currentImg, setCurrentImg] = useState(data.thumbnail);
    const intervalRef = useRef(null);
    const frameIndexRef = useRef(0);
    const isVideo = data.type === "video";
    const startPreview = () => {
        if (!isVideo) return;
        intervalRef.current = setInterval(() => {
            frameIndexRef.current = (frameIndexRef.current + 1) % data.video_pic.length;
            setCurrentImg(data.video_pic[frameIndexRef.current].picture)
        }, 200);
    }
    const stopPreview = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        frameIndexRef.current = 0;
        setCurrentImg(data.thumbnail);
    };
    useEffect(() => {
        if (!isVideo || !data.video_pic) return;
        data.video_pic.forEach(frame => {
            const img = new Image();
            img.src = frame.picture;
        });

        return () => clearInterval(intervalRef.current);
    }, [isVideo, data.video_pic]);

    return (
        <Link href={href} className="row-span-1">
            <div className="flex flex-col w-full" onMouseEnter={startPreview} onMouseLeave={stopPreview}>
                <div>
                    <img src={currentImg} className="object-cover object-center w-full" alt={data.title} />
                </div>
                <div>
                    <p>{data.thumb_description}</p>
                </div>
            </div>
        </Link>
    )
}

export default ResultCard