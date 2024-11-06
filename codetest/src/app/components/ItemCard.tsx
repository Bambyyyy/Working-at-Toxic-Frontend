import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RetrievedSeriesType } from "../types/Series";

type Props = {
  serie: RetrievedSeriesType;
};

export default function ItemCard({ serie }: Props) {
  return (
    <Link href={`/`}>
      <div className="relative aspect-[2/3]">
        <Image
          src={
            serie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
              : "/posternotfound.png"
          }
          alt={serie.name}
          fill
          className="object-cover"
          sizes="25vw"
        />
      </div>
      <div className="py-2">
        <h3>{serie.name}</h3>
      </div>
    </Link>
  );
}
