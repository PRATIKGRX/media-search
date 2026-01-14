"use client";
import ResultCard from "@/src/components/ResultCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image, FilePlay } from "lucide-react";
import { motion } from 'framer-motion';
import Masonry from "react-masonry-css";

const page = () => {
  const liked = useSelector((state) => state.collection.liked);
  const photoLiked = liked.filter((item) => item.type === 'photo');
  const videoLiked = liked.filter((item) => item.type === 'video');
  const [activeLiked, setActiveLiked] = useState([]);
  const [activeTab, setActiveTab] = useState('photo');
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  useEffect(() => {
    if (activeTab === 'photo') {
      setActiveLiked(photoLiked);
    }
    else {
      setActiveLiked(videoLiked);
    }
  }, [activeTab]);
  return (
    <div className="">
      <Link href={'/'} className="flex"><div className="border p-2 my-2 flex gap-2 items-center"><ArrowLeft />Go Home</div></Link>
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveTab('photo')} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'photo' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}
          <Image className="relative z-10" /><span className="relative z-10">photo</span>
        </button>

        <button onClick={() => setActiveTab('video')} className="flex gap-1 items-center relative p-2 hover:cursor-pointer">
          {activeTab === 'video' && (
            <motion.div layoutId="tab" className="absolute inset-0 border"></motion.div>
          )}
          <FilePlay className="relative z-10" />
          <span className="relative z-10">
            Video
          </span>
        </button>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {activeLiked.map((item, index) => (
          <ResultCard key={index} data={item} />
        ))}
      </Masonry>
    </div>
  )
}

export default page