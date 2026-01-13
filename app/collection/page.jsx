"use client";
import ResultCard from "@/src/components/ResultCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image, FilePlay } from "lucide-react";
const page = () => {
  const liked = useSelector((state) => state.collection.liked);
  const photoLiked = liked.filter((item) => item.type === 'photo');
  const videoLiked = liked.filter((item) => item.type === 'video');
  const [activeLiked, setActiveLiked] = useState([]);
  const [activeTab, setActiveTab] = useState('photo');
  useEffect(() => {
    if (activeTab === 'photo') {
      setActiveLiked(photoLiked);
    }
    else {
      setActiveLiked(videoLiked);
    }
  }, [activeTab]);
  return (
    <div>
      <Link href={'/'}><ArrowLeft /></Link>
      <button onClick={() => setActiveTab('photo')}><Image />Photo</button>
      <button onClick={() => setActiveTab('video')}><FilePlay />Video</button>
      {activeLiked.map((item, index) => (
        <ResultCard key={index} data={item} />
      ))}
    </div>
  )
}

export default page