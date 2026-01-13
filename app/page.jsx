"use client";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, setQuery, setActiveTab } from '@/src/store/features/searchSlice';
import React from 'react'
import ResultCard from '@/src/components/ResultCard';
import Link from 'next/link';
import Header from '@/src/components/Header';
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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} dispatch={dispatch} setPageCount={setPageCount} handleSearch={handleSearch} search={search} setSearch={setSearch}/>
      <div className='grid grid-cols-3 gap-2'>
        {results.map((item, index) => (
          <ResultCard key={index} data={item} />
        ))}
      </div>
      <div ref={observerRef} className='h-4'></div>
    </div>
  )
}

export default page