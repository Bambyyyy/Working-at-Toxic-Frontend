"use client";
import React, { useEffect, useState } from "react";
import { RetrievedDataFromAPI, RetrievedSeriesType } from "../types/Series";

type Props = {};

type GenreType = {
  id: number;
  name: string;
};

type GenreResponse = {
  genres: GenreType[];
};

export default function FilterMenu() {
  const [genresList, setGenresList] = useState<GenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [series, setSeries] = useState<RetrievedSeriesType[]>([]);
  const [isFilteredByRelease, setIsFilteredByRelease] =
    useState<boolean>(false);
  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apikey}&language=en-US`
      );
      const genreData: GenreResponse = await res.json();
      setGenresList(genreData.genres);
    };
    fetchGenres();
  }, []);

  const addSeriesByGenre = async (genreId: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&language=en-US&with_genres=${genreId}`
    );
    const seriesData: RetrievedDataFromAPI = await res.json();

    setSeries((prevSeries) => {
      const newSeries = seriesData.results.filter(
        (newItem) => !prevSeries.some((item) => item.id === newItem.id)
      );
      return [...prevSeries, ...newSeries];
    });
  };

  const removeSeriesByGenre = (genreId: number) => {
    setSeries((prevSeries) =>
      prevSeries.filter((item) => !item.genre_ids.includes(genreId))
    );
  };

  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres((prev) => prev.filter((genreId) => genreId !== id));
      removeSeriesByGenre(id);
    } else {
      setSelectedGenres((prev) => [...prev, id]);
      addSeriesByGenre(id);
    }
  };

  const toggleByReleaseDate = () => {
    setIsFilteredByRelease(!isFilteredByRelease);
  };

  const allSeries = isFilteredByRelease
    ? [...series].sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
      )
    : series;

  console.log("allSeries: ", allSeries);

  return (
    <div className="space-y-5 w-1/6 px-4 xl:pr-4">
      {genresList && genresList.length ? (
        <>
          <h3 className="text-lg font-semibold">Filter by genre</h3>
          <div className="flex flex-col space-y-1">
            {genresList.map((item, index) => (
              <button
                onClick={() => toggleGenre(item.id)}
                key={index}
                className="w-full rounded-sm text-xs text-left"
              >
                <p
                  className={`${
                    selectedGenres.includes(item.id)
                      ? "bg-black text-white"
                      : "bg-transparent text-black"
                  } px-2 py-1 rounded-sm text-xs w-fit transition-colors duration-300 ease-in-out`}
                >
                  {item.name}
                </p>
              </button>
            ))}
          </div>
          <button
            onClick={toggleByReleaseDate}
            className={`text-left rounded-lg text-xs w-full`}
          >
            <p
              className={`${
                isFilteredByRelease
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              } px-2 py-1 text-left rounded-lg text-xs w-fit transition-colors duration-300 ease-in-out`}
            >
              Sort by release
            </p>
          </button>
        </>
      ) : (
        <div>
          <p>Kunde tyvärr inte hitta några genrer</p>
        </div>
      )}
    </div>
  );
}
