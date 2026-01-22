"use client";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, setQuery, setActiveTab } from '@/src/store/features/searchSlice';
import React from 'react'
import ResultCard from '@/src/components/ResultCard';
import Masonry from "react-masonry-css";
import Header from '@/src/components/Header';
const page = () => {
  const observerRef = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const { query, activeTab, results, loading } = useSelector((state) => state.search);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  const handleSearch = () => {
    dispatch(setQuery(search));
    setSearch('');
  }
  useEffect(() => {
    if (!query.trim()) return;
    dispatch(fetchMedia({ query, activeTab, page: pageCount }));
  }, [query, activeTab, pageCount, dispatch]);
  useEffect(() => {
    setPageCount(1);
  }, [query, activeTab]);
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPageCount((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [query]);

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} setPageCount={setPageCount} handleSearch={handleSearch} search={search} setSearch={setSearch} setSuggestion={setSuggestion} suggestion={suggestion} />
      {loading && <div className='w-full flex justify-center'><span className="inline-block w-12 h-12 border-[5px] border-black border-b-transparent rounded-full animate-spin"></span>
      </div>}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4 p-4"
      >
        {results.map((item, index) => (
          <ResultCard key={index} data={item} />
        ))}
      </Masonry>
      <div ref={observerRef}><div className='w-full flex justify-center'><span className="inline-block w-12 h-12 border-[5px] border-black border-b-transparent rounded-full animate-spin"></span>
      </div></div>
    </div>
  )
}

export default page