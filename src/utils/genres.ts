const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

const genresByName = genres.reduce((acc, genre) => {
  const key = genre.name.toUpperCase().replace(' ', '_');
  acc[key] = genre;
  return acc;
}, {} as Record<string, { id: number; name: string }>);

const genresById = genres.reduce((acc, genre) => {
  const key = genre.id;
  acc[key] = genre;
  return acc;
}, {} as Record<number, { id: number; name: string }>);

const getMainGenre = (ids?: number[]) => {
  if (ids?.includes(genresByName.CRIME.id)) {
    return genresByName.CRIME.id;
  }

  if (ids?.includes(genresByName.WAR.id)) {
    return genresByName.WAR.id;
  }

  if (ids?.includes(genresByName.ROMANCE.id)) {
    return genresByName.ROMANCE.id;
  }
  return ids?.sort().shift();
};

export { getMainGenre, genresById, genresByName };
