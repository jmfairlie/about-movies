import { Loading } from '@geist-ui/core';
import type { PropsWithChildren } from 'react';
import React, { Fragment } from 'react';
import { ErrorBanner } from './ErrorFallback';

type TLoaderContainerProps = PropsWithChildren<{
  loading: boolean;
  error?: Error;
}>;

const LoaderContainer = ({
  loading,
  error,
  children
}: TLoaderContainerProps) => {
  if (error) {
    return <ErrorBanner error={error} />;
  } else if (loading) {
    return (
      <Loading type="success">
        <span className="loading-message">loading content</span>
      </Loading>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default LoaderContainer;
