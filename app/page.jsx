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
  const isFetchingRef = useRef(false);
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
    isFetchingRef.current = true;
    dispatch(fetchMedia({ query, activeTab, page: 1 }));
    setPageCount(1);
  }, [query, activeTab, dispatch]);
  useEffect(() => {
    if (!query.trim()) return;
    if (pageCount === 1) return;
    dispatch(fetchMedia({ query, activeTab, page: pageCount }));
  }, [pageCount, dispatch]);
  useEffect(() => {
    if (loading) return;
    if (!observerRef.current) return;
    if (results.length === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !isFetchingRef.current) {
          isFetchingRef.current = true;
          setPageCount((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, results.length]);
  useEffect(() => {
    if (!loading) {
      isFetchingRef.current = false;
    }
  }, [loading]);
  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} setPageCount={setPageCount} handleSearch={handleSearch} search={search} setSearch={setSearch} setSuggestion={setSuggestion} suggestion={suggestion} />
      {loading && <div className='w-full flex justify-center'><span class="loader"></span>
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
      {results.length > 0 && !loading && (
        <div ref={observerRef} style={{ height: 1 }} />
      )}
    </div>
  )
}

export default page