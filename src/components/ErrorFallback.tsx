import { Button } from '@geist-ui/core';
import type { AxiosError } from 'axios';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useRouteError } from 'react-router-dom';
import StackTracey from 'stacktracey';

type TErrorBannerProps = {
  error: Error | AxiosError;
  action?: () => void;
  actionLabel?: string;
};

const ErrorBanner = ({ error, action, actionLabel }: TErrorBannerProps) => {
  const stack = new StackTracey(error.stack);
  return (
    <div className="error-message transform-center-xy">
      <div className="error-header">An error ocurred: {error.message}</div>
      <div className="error-object">
        {process.env.NODE_ENV === 'development'
          ? stack.items.map((item, index) => (
              <div key={index}>{item.beforeParse}</div>
            ))
          : null}
      </div>
      {action ? <Button onClick={action}>{actionLabel}</Button> : null}
    </div>
  );
};

const ErrorFallback = ({ error }: FallbackProps) => {
  return <ErrorBanner error={error} />;
};

const RouterErrorComponent = () => {
  const error = useRouteError() as Error;
  console.dir(error);
  return <ErrorBanner error={error} />;
};

export default ErrorFallback;
export { RouterErrorComponent, ErrorBanner };
