import React, { useContext } from 'react';
import Slider from 'react-slick';
import type { MovieSearchResult } from 'tmdb-ts-api';
import { getImageUrl } from '~/utils';
import { GlobalContext } from './GlobalContextProvider';
import MovieSlide from './MovieSlide';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 2200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

type TCarouselArgs = { title: string; items: MovieSearchResult[] };
const MovieCarousel = ({ title, items }: TCarouselArgs) => {
  const {
    images: { secure_base_url, poster_sizes }
  } = useContext(GlobalContext) ?? { images: {} };

  const [, posterSize] = poster_sizes;

  return (
    <div className="carousel-container">
      <h1>
        <span>{title}</span>
      </h1>
      <Slider {...settings}>
        {items.map((movie) => {
          const posterURL = getImageUrl(
            secure_base_url,
            movie.poster_path,
            posterSize
          );
          return (
            <MovieSlide
              key={movie.id}
              {...movie}
              posterURL={posterURL}
              category={title.toLowerCase()}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
