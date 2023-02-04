import type { FunctionComponent } from 'react';
import React from 'react';
import type { TGenericDataHook } from '~/types';
import LoaderContainer from './LoaderContainer';

const LoadableHOC =
  <S, T>(Component: FunctionComponent<T>, dataHook: TGenericDataHook<S, T>) =>
  (props: S) => {
    const { data, error, loading } = dataHook(props);

    return (
      <LoaderContainer loading={loading} error={error}>
        <Component {...data} />
      </LoaderContainer>
    );
  };

export default LoadableHOC;
