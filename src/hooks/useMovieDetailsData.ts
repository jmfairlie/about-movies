import { useContext, useMemo } from 'react';
import { GlobalContext } from '~/components/GlobalContextProvider';
import { getImageUrl, getMainGenre } from '~/utils';
import useGetMovieCredits from './useGetMovieCredits';
import useGetMovieDetails from './useGetMovieDetails';
import useMovieRecommendations from './useMovieRecommendations';
import useURLImages from './useURLImages';

type TUseDataProps = {
  movieId: number;
};
const useData = ({ movieId }: TUseDataProps) => {
  const {
    images: { secure_base_url, poster_sizes }
  } = useContext(GlobalContext) ?? { images: {} };

  const {
    data: movieDetails,
    error: detailsError,
    isInitialLoading: detailsLoading
  } = useGetMovieDetails(movieId);

  const {
    data: dataRecommendations,
    error: recommendationsError,
    isInitialLoading: recommendationsLoading
  } = useMovieRecommendations(movieId);

  const {
    data: movieCredits,
    error: creditsError,
    isInitialLoading: creditsLoading
  } = useGetMovieCredits(movieId);

  const [, , , , posterSize] = poster_sizes;

  const pURL = useMemo(
    () =>
      movieDetails?.poster_path
        ? getImageUrl(secure_base_url, movieDetails.poster_path, posterSize)
        : undefined,
    [secure_base_url, movieDetails?.poster_path, posterSize]
  );

  const {
    data: [posterURL] = [],
    isInitialLoading: posterLoading,
    error: posterError
  } = useURLImages([pURL]);

  const loading =
    detailsLoading || recommendationsLoading || creditsLoading || posterLoading;

  const error =
    detailsError || recommendationsError || creditsError || posterError;

  return useMemo(
    () => ({
      loading,
      error,
      data: {
        ...movieDetails,
        posterURL,
        recommendations: dataRecommendations,
        cast: movieCredits?.cast?.slice(0, 3),
        main_genre: getMainGenre(movieDetails?.genres.map((g) => g.id))
      }
    }),
    [
      error,
      loading,
      movieDetails,
      posterURL,
      dataRecommendations,
      movieCredits?.cast
    ]
  );
};

type THook = typeof useData;
type THookResponse = ReturnType<THook>;
type THookResponseData = THookResponse['data'];

export default useData;
export type { THook, THookResponse, THookResponseData };
