import React from "react";
import { RetrievedDataFromAPI, RetrievedSeriesType } from "../types/Series";
import ItemCard from "./ItemCard";

export default async function ItemList() {
  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=en-US&page=1`
  );
  const data: RetrievedDataFromAPI = await res.json();
  const seriesList: RetrievedSeriesType[] = data.results;
  console.log(seriesList);

  return (
    <main className="max-w-[80rem] mx-auto my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 xl:px-0">
        {seriesList && seriesList.length
          ? seriesList.map((item) => <ItemCard key={item.id} serie={item} />)
          : null}
      </div>
    </main>
  );
}
