import React, { createRef, Fragment, useMemo } from 'react';
import LandingPage from './LandingPage';
import MovieDetails from './MovieDetails';

import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  useParams
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RouterErrorComponent } from './ErrorFallback';
import Header from './Header';

const MovieDetailsRoute = () => {
  const { id } = useParams();
  const movieId = parseInt(id, 10);
  return <MovieDetails movieId={movieId} />;
};

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    element: <LandingPage />,
    nodeRef: createRef<HTMLDivElement>()
  },
  {
    path: '/movie/:id',
    name: 'Movie Details',
    element: <MovieDetailsRoute />,
    nodeRef: createRef<HTMLDivElement>()
  }
];

const Root = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = useMemo(
    () =>
      routes.find((route) => route.path === location.pathname) ?? {
        nodeRef: undefined
      },
    [location.pathname]
  );
  return (
    <Fragment>
      <Header />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {() => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </Fragment>
  );
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element,
        errorElement: <RouterErrorComponent />
      }))
    }
  ],
  { basename: process.env.__PUBLIC_PATH__ }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
