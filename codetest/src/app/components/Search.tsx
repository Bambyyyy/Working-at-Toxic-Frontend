"use client";
import React, { useEffect, useState } from "react";
import { RetrievedDataFromAPI, RetrievedSeriesType } from "../types/Series";
import SearchCard from "./SearchCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RetrievedSeriesType[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const fetchSerieData = async (query: string) => {
        try {
          const res = await fetch(
            `http://localhost:3000/api/searchSeries?query=${query}`
          );
          const data: RetrievedDataFromAPI = await res.json();
          setSearchResults(data.results);
        } catch (error) {
          console.error();
        }
      };
      fetchSerieData(query);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    setSearchResults([]);
    setQuery("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Sök..."
        value={query}
        onChange={handleInputChange}
        className="px-3 py-1 outline-none text-black rounded-lg w-52 md:w-72"
      />
      {searchResults && searchResults.length ? (
        <div className="absolute top-12 left-0 w-full z-10 bg-white text-black border-2 rounded-lg border-black flex flex-col items-start h-96 overflow-y-auto">
          {searchResults.map((item) => (
            <SearchCard key={item.id} item={item} handleClick={handleClick} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
