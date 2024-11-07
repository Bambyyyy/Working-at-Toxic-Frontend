import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RetrievedSeriesType } from "../types/Series";

type Props = {
  serie: RetrievedSeriesType;
};

export default function ItemCard({ serie }: Props) {
  return (
    <Link href={`/series/${serie.id}`}>
      <div className="relative aspect-[2/3] group overflow-hidden">
        <Image
          src={
            serie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
              : "/posternotfound.png"
          }
          alt={serie.name}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 40vw, (max-width: 1023px) 33vw, 25vw"
        />
        <div className="hidden md:flex group-hover:bottom-0 group-hover:h-8 bottom-0 justify-center items-center h-0 absolute bg-opacity-60 bg-black text-white w-full ease-in-out transition-all duration-300">
          <p>Rating: {serie.vote_average.toFixed(1)} / 10</p>
        </div>
      </div>
      <div className="py-2">
        <h3>{serie.name}</h3>
      </div>
    </Link>
  );
}
