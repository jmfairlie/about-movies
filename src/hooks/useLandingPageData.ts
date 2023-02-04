import { useMemo } from 'react';
import { genresByName as genres } from '~/utils';
import useMovies from './useMovies';

const Key0 = genres.CRIME;
const Key1 = genres.WAR;
const Key2 = genres.ROMANCE;

const x1 = [Key1.id, Key2.id];
const x2 = [Key0.id, Key2.id];
const x3 = [Key0.id, Key1.id];

const useData = () => {
  const {
    data: key0Data,
    error: key0Error,
    isInitialLoading: key0Loading
  } = useMovies({ genreId: Key0.id, exclude: x1 });

  const {
    data: key1Data,
    error: key1Error,
    isInitialLoading: key1Loading
  } = useMovies({ genreId: Key1.id, exclude: x2 });

  const {
    data: key2Data,
    error: key2Error,
    isInitialLoading: key2Loading
  } = useMovies({ genreId: Key2.id, exclude: x3 });

  const { results: List0 = [] } = key0Data ?? {};
  const { results: List1 = [] } = key1Data ?? {};
  const { results: List2 = [] } = key2Data ?? {};

  const loading = key0Loading || key1Loading || key2Loading;
  const error = key0Error || key1Error || key2Error;

  return useMemo(
    () => ({
      loading,
      error,
      data: {
        lists: {
          [Key0.name]: List0,
          [Key1.name]: List1,
          [Key2.name]: List2
        }
      }
    }),
    [error, loading, List0, List1, List2]
  );
};

type THook = typeof useData;
type THookResponse = ReturnType<THook>;
type THookResponseData = THookResponse['data'];

export default useData;
export type { THook, THookResponse, THookResponseData };
