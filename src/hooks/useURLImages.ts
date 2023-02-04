import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useCallback, useMemo } from 'react';

const getDataURI = (url?: string, defaultImage?: string) =>
  url
    ? axios
        .get(url, {
          responseType: 'blob'
        })
        .then((response) => {
          const reader = new FileReader();
          const p = new Promise<string>((res) => {
            reader.onloadend = () => {
              res(reader.result as string);
            };
          });
          reader.readAsDataURL(response.data);
          return p;
        })
    : Promise.resolve(defaultImage);

const useURLImages = (
  urls: (string | null | undefined)[],
  defaultImage?: string
) => {
  const queryFn = useCallback(
    () =>
      Promise.all(
        urls
          .map((url) => getDataURI(url, defaultImage))
          //remove empty images if any
          .filter((item) => Boolean(item))
      ),
    [urls, defaultImage]
  );

  const enabled = useMemo(
    () => Boolean(urls?.every((url) => url !== undefined)),
    [urls]
  );

  return useQuery<string[], AxiosError>({
    queryFn,
    queryKey: ['images', urls],
    enabled,
    //filter out empty undefined items
    select: (d) => d.filter((item) => Boolean(item))
  });
};

export default useURLImages;
