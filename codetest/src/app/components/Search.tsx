"use client";
import React, { useState } from "react";
import { RetrievedSeriesType } from "../types/Series";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RetrievedSeriesType[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setQuery(e.target.value);
    }, 2000);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sök..."
        className="px-3 py-1 outline-none text-black rounded-lg"
      />
    </div>
  );
}
