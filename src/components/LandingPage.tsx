import React, { Fragment, useContext, useEffect } from 'react';
import { useLandingPageData as useData } from '~/hooks';
import type { THookResponseData as TLandingPageProps } from '~/hooks/useLandingPageData';
import { GlobalContext } from './GlobalContextProvider';
import LoadableHOC from './LoadableHOC';
import MovieCarousel from './MovieCarousel';

const LandingPage = ({ lists }: TLandingPageProps) => {
  const { setCurrentCategory } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentCategory(undefined);
  }, [setCurrentCategory]);

  return (
    <div className="carousels">
      {Object.entries(lists).map(([key, list]) => (
        <Fragment key={key}>
          <MovieCarousel title={key} items={list} />
          <div className="flex-expand" />
        </Fragment>
      ))}
    </div>
  );
};

export default LoadableHOC(LandingPage, useData);
