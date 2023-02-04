import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import { Button, Rating } from '@geist-ui/core';
import ArrowLeft from '@geist-ui/icons/arrowLeft';
import ShoppingCart from '@geist-ui/icons/shoppingCart';
import XCircle from '@geist-ui/icons/xCircle';
import format from 'date-fns/format';
import langs from 'langs';
import { useNavigate } from 'react-router-dom';
import type { MovieDetails } from 'tmdb-ts-api';
import { useCart, useMovieDetailsData as useData } from '~/hooks';
import type { THookResponseData as TMovieDetailsProps } from '~/hooks/useMovieDetailsData';
import Cast from './Cast';
import Genres from './Genres';
import LoadableHOC from './LoadableHOC';
import MovieRecommendations from './MovieRecommendations';

import { genresById } from '~/utils';
import { GlobalContext } from './GlobalContextProvider';

const MovieDetails = ({
  id,
  cast,
  original_title,
  overview,
  posterURL,
  tagline,
  original_language,
  release_date,
  genres,
  runtime,
  vote_average,
  recommendations,
  main_genre
}: TMovieDetailsProps) => {
  const { setCurrentCategory } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentCategory(genresById[main_genre]?.name.toLocaleLowerCase());
  }, [main_genre, setCurrentCategory]);

  const navigate = useNavigate();
  const { addToCart, removeFromCart, contains } = useCart();

  const isInCart = useMemo(() => contains(id), [contains, id]);

  const year = useMemo(
    () => (release_date ? format(new Date(release_date), 'yyyy') : ''),
    [release_date]
  );

  const { name: language } = useMemo(
    () => langs.where(1, original_language),
    [original_language]
  );

  const addClickHandler = useCallback(() => {
    addToCart({ movieId: id, movieTitle: original_title });
  }, [addToCart, id, original_title]);

  const removeClickHandler = useCallback(() => {
    removeFromCart(id);
  }, [removeFromCart, id]);

  const backClickHandler = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  return (
    <div className="movie-details flex-col flex-expand">
      <div className="flex-expand" />
      <div className="max-width movie-details--image-details flex-row transform-center-x">
        <img src={posterURL} />
        <div className="movie-details--description">
          <div className="title">
            <h1>{original_title}</h1>
          </div>
          <span className="year">
            {year}&nbsp;&bull;&nbsp;{language}&nbsp;&bull;&nbsp;{runtime} min
          </span>

          <Rating locked={true} value={vote_average / 2.0} count={5} />

          <Genres genres={genres} />

          <Cast cast={cast} />

          <h2 className="tagline">{tagline}</h2>
          <div className="overview flex-expand">
            <div className="transform-center-y">{overview}</div>
          </div>
          <div className="toolbar">
            <Button
              iconRight={<ArrowLeft />}
              onClick={backClickHandler}
              auto
              scale={2 / 3}
              type="success"
            />
            <div className="flex-expand" />

            <Button
              iconRight={<ShoppingCart />}
              disabled={isInCart}
              onClick={addClickHandler}
              auto
              scale={2 / 3}
              type="success"
            />
            <Button
              iconRight={<XCircle />}
              disabled={!isInCart}
              onClick={removeClickHandler}
              auto
              scale={2 / 3}
              type="success"
            />
          </div>
        </div>
      </div>
      <div className="flex-expand" />

      <div className="max-width movie-details--additional-info transform-center-x">
        <MovieRecommendations list={recommendations} />
      </div>
    </div>
  );
};

export default LoadableHOC(MovieDetails, useData);
