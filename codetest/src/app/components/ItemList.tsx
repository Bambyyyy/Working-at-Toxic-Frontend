"use client";
import React, { useEffect, useState } from "react";
import { RetrievedDataFromAPI, RetrievedSeriesType } from "../types/Series";
import ItemCard from "./ItemCard";
import FilterMenu from "./FilterMenu";

export default function ItemList() {
  const [seriesList, setSeriesList] = useState<RetrievedSeriesType[] | []>([]);
  const [genreSeriesList, setGenreSeriesList] = useState<
    RetrievedSeriesType[] | []
  >([]);
  const [isFilteredByRelease, setIsFilteredByRelease] =
    useState<boolean>(false);
  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=en-US&page=1`
      );
      const data: RetrievedDataFromAPI = await res.json();
      setSeriesList(data.results);
    };
    fetchPopularMovies();
  }, []);

  const displayedSeries = isFilteredByRelease
    ? [...(genreSeriesList.length ? genreSeriesList : seriesList)].sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
      )
    : genreSeriesList.length
    ? genreSeriesList
    : seriesList;

  console.log(seriesList);

  return (
    <main className="max-w-[80rem] mx-auto my-10 flex flex-row-reverse">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 xl:px-0 w-5/6">
        {displayedSeries.map((item) => (
          <ItemCard key={item.id} serie={item} />
        ))}
      </div>
      <FilterMenu
        genreSeriesList={genreSeriesList}
        setGenreSeriesList={setGenreSeriesList}
        seriesList={seriesList}
        isFilteredByRelease={isFilteredByRelease}
        setIsFilteredByRelease={setIsFilteredByRelease}
      />
    </main>
  );
}
