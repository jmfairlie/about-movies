import { Rating } from '@geist-ui/core';
import classNames from 'classnames';
import format from 'date-fns/format';
import langs from 'langs';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MovieSearchResult } from 'tmdb-ts-api';
import { ReactComponent as AddSvg } from '~/assets/add-cart.svg';
import { ReactComponent as OpenSvg } from '~/assets/eye.svg';
import { useCart } from '~/hooks';
import { extractFirstSentence } from '~/utils';

type TMovieSlideProps = MovieSearchResult & {
  posterURL: string;
  category?: string;
};

const MovieSlide = ({
  id,
  posterURL,
  original_title,
  release_date,
  original_language,
  vote_average,
  overview
}: TMovieSlideProps) => {
  const navigate = useNavigate();
  const { addToCart, contains } = useCart();

  const isInCart = useMemo(() => contains(id), [contains, id]);
  const year = useMemo(
    () => (release_date ? format(new Date(release_date), 'yyyy') : ''),
    [release_date]
  );

  //extract first sentence
  const summary = useMemo(
    () => `${extractFirstSentence(overview)}.`,
    [overview]
  );
  const { name: language } = langs.where(1, original_language) ?? {};

  const addClickHandler = useCallback(() => {
    if (!isInCart) {
      addToCart({ movieId: id, movieTitle: original_title });
    }
  }, [addToCart, id, original_title, isInCart]);

  const openClickHandler = useCallback(() => {
    navigate(`/movie/${id}`);
  }, [id, navigate]);

  return (
    <div
      className={classNames('movie-slide-container', { selected: isInCart })}
    >
      <div className="movie-slide--details">
        <div className="movie-slide--details--title">
          <span className="title">{original_title}</span>
          &nbsp;
          <span className="year">
            ({year}, {language})
          </span>
        </div>

        <div className="movie-slide--details--overview">
          <div>
            <Rating locked={true} value={vote_average / 2.0} count={5} />
          </div>
          {summary}
        </div>

        <div className="movie-slide-toolbar">
          <OpenSvg className="open-icon" onClick={openClickHandler} />
          &nbsp;
          <AddSvg
            className={classNames('add-icon', { disabled: isInCart })}
            onClick={addClickHandler}
          />
        </div>
      </div>
      <img key={id} src={posterURL} onClick={openClickHandler} />
    </div>
  );
};
export default MovieSlide;
