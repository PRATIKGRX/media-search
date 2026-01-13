"use client";
import ResultCard from "@/src/components/ResultCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  },[activeTab]);
  return (
    <div>
      <Link href={'/'}>Go back</Link>
      <button onClick={() => setActiveTab('photo')}>Photo</button>
      <button onClick={() => setActiveTab('video')}>Video</button>
      {activeLiked.map((item,index) => (
        <ResultCard key={index} data={item} />
      ))}
    </div>
  )
}

export default page