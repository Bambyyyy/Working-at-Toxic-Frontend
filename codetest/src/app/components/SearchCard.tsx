import Link from "next/link";
import React from "react";
import Image from "next/image";
import { RetrievedSeriesType } from "../types/Series";

type Props = {
  item: RetrievedSeriesType;
  handleClick: () => void;
};

export default function SearchCard({ item, handleClick }: Props) {
  return (
    <Link
      href={`/series/${item.id}`}
      key={item.id}
      onClick={handleClick}
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
        <p className="text-xs">Rating: {item.vote_average.toFixed(1)}</p>
        <p className="text-xs">LG: {item.original_language.toUpperCase()}</p>
      </div>
    </Link>
  );
}
