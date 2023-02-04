import type { AxiosError } from 'axios';
type TMovie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type TMovieType = 'movie' | 'series' | 'episode';

type TSearchSuccessResponse = {
  Response: 'True';
  Search: TMovie[];
  totalResponse: string;
};

type TSearchErrorResponse = {
  status_message: 'False';
  status_code: number;
};

type TSearchResponse = TSearchSuccessResponse | TSearchErrorResponse;

type TGenericDataHook<S, T> = (args?: S) => {
  loading: boolean;
  error?: AxiosError | Error;
  data?: T;
};

export type {
  TMovie,
  TMovieType,
  TSearchResponse,
  TSearchErrorResponse,
  TGenericDataHook
};
