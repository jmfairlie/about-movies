import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '~/utils';
import { MovieCredits } from 'tmdb-ts-api';

const useGetMovieCredits = (id: number) => {
  const qFn = useCallback(() => {
    return tmdb.movie.getCredits(id);
  }, [id]);

  return useQuery<MovieCredits, Error>({
    queryKey: ['movie-credits', id],
    queryFn: qFn
  });
};

export default useGetMovieCredits;
