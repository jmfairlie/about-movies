import React, { createContext } from 'react';
import type { ApiConfiguration } from 'tmdb-ts-api';
type TContext = ApiConfiguration & {
  currentCategory?: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<TContext | undefined>(undefined);
type TContextProviderProps = {
  data: TContext;
  children: React.ReactNode;
};

const GlobalContextProvider = ({ data, children }: TContextProviderProps) => {
  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
export { GlobalContext };
