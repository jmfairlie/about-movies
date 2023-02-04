import { Rating } from '@geist-ui/core';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRecommendations } from '~/hooks/useMovieRecommendations';
type TMovieRecommendationsProps = {
  list: TRecommendations;
};

const MovieRecommendations = ({ list }: TMovieRecommendationsProps) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(
    (id: number) => {
      navigate(`/movie/${id}`);
    },
    [navigate]
  );
  return list?.length ? (
    <div className="movie-recommendations flex-col">
      <div className="recommendations-title">Others also liked:</div>
      <div className="recommendations-container flex-row flex-expand">
        {list.map((item) => (
          <div
            key={item.id}
            className="recommendation-image flex-col"
            onClick={() => clickHandler(item.id)}
            style={{
              backgroundImage: `url("${item.backdrop}")`
            }}
          >
            <div className="info flex-row">
              <div>{item.original_title}</div>
              <div className="flex-row">
                <Rating locked={true} value={item.vote_average / 2} count={5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default MovieRecommendations;
