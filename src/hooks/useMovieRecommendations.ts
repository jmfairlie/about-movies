import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import type { MovieRecommendations } from 'tmdb-ts-api';
import { GlobalContext } from '~/components/GlobalContextProvider';
import { getImageUrl, tmdb } from '~/utils';
import useURLImages from './useURLImages';

type TRecommendation = Pick<
  MovieRecommendations['results'][number],
  'id' | 'backdrop_path' | 'original_title' | 'vote_average'
> & { main_genre?: number };

const useMovieRawRecommendations = (movieId: number) => {
  const queryFn = useCallback(
    () => tmdb.movie.getRecommendations(movieId),
    [movieId]
  );

  return useQuery<
    MovieRecommendations,
    Error,
    TRecommendation[],
    [string, number]
  >({
    queryKey: ['recommendations', movieId],
    queryFn,
    select: (d) =>
      d.results.slice(0, 3).map((rec) => ({
        id: rec.id,
        backdrop_path: rec.backdrop_path,
        original_title: rec.original_title,
        vote_average: rec.vote_average
      }))
  });
};

const useMovieRecommendations = (movieId: number) => {
  const {
    images: { secure_base_url, backdrop_sizes }
  } = useContext(GlobalContext) ?? { images: {} };

  const [backdropSize] = backdrop_sizes;
  const query = useMovieRawRecommendations(movieId);
  let recommendations = query.data;

  if (recommendations?.length) {
    //remove items with no image
    recommendations = recommendations?.filter((rec) =>
      Boolean(rec.backdrop_path)
    );
  }

  const images = useMemo(
    () =>
      recommendations?.map((r) =>
        getImageUrl(secure_base_url, r.backdrop_path, backdropSize)
      ),
    [backdropSize, recommendations, secure_base_url]
  );

  const imagesQuery = useURLImages(images);

  return useMemo(
    () => ({
      ...imagesQuery,
      data: imagesQuery.data?.map((backdrop, index) => ({
        ...query.data[index],
        backdrop
      }))
    }),
    [imagesQuery, query]
  );
};

type TRecommendations = ReturnType<typeof useMovieRecommendations>['data'];

export default useMovieRecommendations;
export type { TRecommendations };
