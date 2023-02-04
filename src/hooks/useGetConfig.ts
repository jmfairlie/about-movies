import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ApiConfiguration } from 'tmdb-ts-api';
import { tmdb } from '~/utils';

const useGetConfig = () => {
  const qFn = useCallback(
    () => tmdb.configuration.get('/configuration', {}, undefined),
    []
  );

  return useQuery<ApiConfiguration, Error>({
    queryKey: ['configuration'],
    queryFn: qFn,
    enabled: true
  });
};

export default useGetConfig;
