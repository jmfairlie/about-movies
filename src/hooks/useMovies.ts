import { useQuery } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { useCallback } from 'react';
import { MoviesSearchResults } from 'tmdb-ts-api';
import { API_KEY } from '~/utils';
const url = (apiKey: string, genres: number[] | number, exclude?: number[]) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&page=1&with_genres=${genres}&with_original_language=en&vote_average.gte=1&with_runtime.gte=60${
    exclude ? `&without_genres=${exclude}` : ''
  }`;

type TUseMoviesArgs = { genreId: number; exclude?: number[] };

const useMovies = ({ genreId, exclude }: TUseMoviesArgs) => {
  const qFn = useCallback(() => {
    return axios.get(url(API_KEY, genreId, exclude));
  }, [genreId, exclude]);

  return useQuery<
    AxiosResponse<MoviesSearchResults>,
    AxiosError,
    MoviesSearchResults,
    string[]
  >({
    queryKey: ['discover-movies', genreId.toString()],
    queryFn: qFn,
    select: (d) => d.data
  });
};

export default useMovies;
