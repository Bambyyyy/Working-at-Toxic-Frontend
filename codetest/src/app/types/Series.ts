export type RetrievedDataFromAPI = {
  page: number;
  results: RetrievedSeriesType[];
  total_pages: number;
  total_results: number;
};

export type RetrievedSeriesType = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};
