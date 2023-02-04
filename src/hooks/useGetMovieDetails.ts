import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { MovieDetails } from 'tmdb-ts-api';
import { tmdb } from '~/utils';
const useGetMovieDetails = (id: number) => {
  const qFn = useCallback(() => {
    return tmdb.movie.getDetails(id);
  }, [id]);

  return useQuery<MovieDetails, Error>({
    queryKey: ['movie-details', id],
    queryFn: qFn
  });
};

export default useGetMovieDetails;
