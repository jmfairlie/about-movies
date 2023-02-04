import React from 'react';
import type { MovieCredits } from 'tmdb-ts-api';

type TCastProps = {
  cast: MovieCredits['cast'];
};

const Cast = ({ cast }: TCastProps) => {
  return cast?.length ? (
    <div className="cast">
      <span>Cast:</span>
      &nbsp;
      {cast.map((item) => item.name).join(', ')}
    </div>
  ) : null;
};

export default Cast;
