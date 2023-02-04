import { Tmdb } from 'tmdb-ts-api';
import type {
  BackdropSize,
  PosterSize
} from 'tmdb-ts-api/dist/configuration/api';
import config from '~/config.json';
import type { TMovie } from '~/types';

const sortFn = (a: TMovie, b: TMovie) =>
  a.Year < b.Year ? -1 : a.Year > b.Year ? 1 : 0;

const noPosterURL =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik03LjgyOCA1bC0xLTFIMjJ2MTUuMTcybC0xLTF2LS42OWwtMy4xMTYtMy4xMTctLjM5NS4yOTYtLjcxNC0uNzE0Ljg1NC0uNjRhLjUwMy41MDMgMCAwIDEgLjY1Ny4wNDZMMjEgMTYuMDY3VjV6TTMgMjB2LS41MTlsMi45NDctMi45NDdhMS41MDYgMS41MDYgMCAwIDAgLjY3Ny4xNjMgMS40MDMgMS40MDMgMCAwIDAgLjk5Ny0uNDE1bDIuOTE2LTIuOTE2LS43MDYtLjcwNy0yLjkxNiAyLjkxNmEuNDc0LjQ3NCAwIDAgMS0uNjc4LS4wNDguNTAzLjUwMyAwIDAgMC0uNzA0LjAwN0wzIDE4LjA2N1Y1LjgyOGwtMS0xVjIxaDE2LjE3MmwtMS0xek0xNyA4LjVBMS41IDEuNSAwIDEgMSAxNS41IDcgMS41IDEuNSAwIDAgMSAxNyA4LjV6bS0xIDBhLjUuNSAwIDEgMC0uNS41LjUuNSAwIDAgMCAuNS0uNXptNS42NDYgMTMuODU0bC43MDctLjcwNy0yMC0yMC0uNzA3LjcwN3oiLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PC9zdmc+';

const urlRegexp =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

const {
  TMDB: {
    AUTH: { v3: API_KEY }
  }
} = config;

const tmdb = new Tmdb({ apiKey: API_KEY });

const getImageUrl = (
  basePath: string,
  path: string,
  sz: PosterSize | BackdropSize,
  defaultImage: string = noPosterURL
) => (path ? `${basePath}${sz}${path}` : defaultImage);

const extractFirstSentence = (sentence: string) =>
  sentence.split(/(?<=[A-Za-z]{2,})\./).shift();

export { genresById, genresByName, getMainGenre } from './genres';
export { default as reactQueryOptions } from './reactQueryOptions';
export { default as sleep } from './sleep';
export {
  extractFirstSentence,
  getImageUrl,
  noPosterURL,
  sortFn,
  tmdb,
  urlRegexp,
  API_KEY
};
