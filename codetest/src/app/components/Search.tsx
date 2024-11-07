"use client";
import React, { useEffect, useState } from "react";
import { RetrievedDataFromAPI, RetrievedSeriesType } from "../types/Series";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RetrievedSeriesType[]>([]);

  useEffect(() => {
    const fetchSerieData = async (query: string) => {
      try {
        const res = await fetch(`api/searchSeries?query=${query}`);
        const data = await res.json();
        console.log(data);
        setSearchResults(data.results);
      } catch (error) {
        console.error();
      }
    };
    fetchSerieData(query);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setQuery(e.target.value);
    }, 2000);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Sök..."
        onChange={handleInputChange}
        className="px-3 py-1 outline-none text-black rounded-lg w-72"
      />
      {searchResults && searchResults.length ? (
        <div className="absolute top-12 left-0 w-full z-10 bg-white text-black flex flex-col items-start h-96 overflow-y-auto">
          {searchResults.map((item) => (
            <Link
              href={`/`}
              key={item.id}
              className="hover:bg-gray-300 flex gap-x-2 w-full p-2"
            >
              <div className="relative w-16 h-20 overflow-hidden">
                <Image
                  src={
                    item.poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/posternotfound.png"
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="10vw"
                />
              </div>
              <div className="flex flex-col w-3/4 justify-evenly">
                <p className="text-sm truncate max-w-44">{item.name}</p>
                <p className="text-xs">
                  Rating: {item.vote_average.toFixed(1)}
                </p>
                <p className="text-xs">
                  LG: {item.original_language.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
