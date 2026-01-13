"use client";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, setQuery, setActiveTab } from '@/src/store/features/searchSlice';
import React from 'react'
import ResultCard from '@/src/components/ResultCard';
import Link from 'next/link';
const page = () => {
  const observerRef = useRef(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const { query, activeTab, results } = useSelector((state) => state.search);
  const handleSearch = () => {
    dispatch(setQuery(search));
    setSearch('');
  }
  useEffect(() => {
    if (!query.trim()) return;
    dispatch(fetchMedia({ page: pageCount }));
    console.log(results)
  }, [query, activeTab, pageCount, dispatch]);
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPageCount((prev) => prev + 1);
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [query]);
  return (
    <div>
      <input type="text" className='' value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => {
        setPageCount(1);
        dispatch(setActiveTab("photo"));
      }}>
        photo
      </button>

      <button onClick={() => {
        setPageCount(1);
        dispatch(setActiveTab("video"));
      }}>
        Video
      </button>

      <div className='grid grid-cols-3'>
        {results.map((item, index) => (
          <ResultCard key={index} data={item} />
        ))}
      </div>
      <div ref={observerRef}>Observer</div>
      <Link href={'/collection'}>Colection</Link>
    </div>
  )
}

export default page