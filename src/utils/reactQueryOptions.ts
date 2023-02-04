const config = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 0,
      staleTime: Infinity,
      cacheTime: 60 * 60 * 1000
    }
  }
};

export default config;
