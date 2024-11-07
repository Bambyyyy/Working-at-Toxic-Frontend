import { RetrievedSeriesType } from "@/app/types/Series";
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = {
  id: string;
};

export default async function PDP(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = params.id;
  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}&language=en-US`
  );
  const serieData: RetrievedSeriesType = await res.json();

  if (!serieData) {
    notFound();
  }

  return (
    <main className="max-w-[80rem] mx-auto my-10 px-5 xl:p-0">
      {serieData ? (
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full lg:w-1/2 relative aspect-[3/4]">
            <Image
              src={
                serieData.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${serieData.poster_path}`
                  : "/posternotfound.png"
              }
              alt={serieData.name}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 space-y-5">
            <h2 className="text-3xl my-5">{serieData.name}</h2>
            <div>
              <p>Rating: {serieData.vote_average.toFixed(1)} / 10</p>
              <p>Air date: {serieData.first_air_date}</p>
            </div>
            <div>
              <p>{serieData.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Inte laddat ännu</div>
      )}
    </main>
  );
}
