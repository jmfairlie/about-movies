import { CssBaseline, GeistProvider } from '@geist-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetConfig } from '~/hooks';
import AppRoutes from './AppRoutes';
import ErrorFallback from './ErrorFallback';
import GlobalContextProvider from './GlobalContextProvider';
import LoaderContainer from './LoaderContainer';

const App = () => {
  const { data, error, isInitialLoading } = useGetConfig();
  const [currentCategory, setCurrentCategory] = useState<string>();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LoaderContainer loading={isInitialLoading} error={error}>
        <GlobalContextProvider
          data={{ ...data, currentCategory, setCurrentCategory }}
        >
          <GeistProvider>
            <CssBaseline />
            <div className={classNames('App', currentCategory)}>
              <AppRoutes />
            </div>
          </GeistProvider>
        </GlobalContextProvider>
      </LoaderContainer>
    </ErrorBoundary>
  );
};

export default App;
