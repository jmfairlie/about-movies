import React from 'react';
import { Badge } from '@geist-ui/core';
import type { MovieDetails } from 'tmdb-ts-api';

type TGenresProps = {
  genres: MovieDetails['genres'];
};

const Genres = ({ genres }: TGenresProps) => (
  <div className="genres">
    {genres.map((genre) => (
      <Badge key={genre.name} type="secondary">
        {genre.name}
      </Badge>
    ))}
  </div>
);

export default Genres;
