import axios from 'axios';

const API_KEY = '8aba4e3419a44727b7eb66f35fce4fa2';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: API_KEY,
  },
});
export const getTrending = async () => {
  const { data } = await instance(`/trending/all/day?language=en-US`);
  return data;
};

export const searchMovies = async () => {
  const { data } = await instance(
    `/3/search/movie?include_adult=false&language=en-US&page=1`
  );
  return data;
};

export const getMovieDetails = async () => {
  const { data } = await instance(`movie/movie_id?language=en-US`);
  return data;
};

export const getMovieCredits = async () => {
  const { data } = await instance(`/movie/movie_id/credits?language=en-US`);
  return data;
};

export const getReviews = async () => {
  const { data } = await instance(
    `/movie/movie_id/reviews?language=en-US&page=1`
  );
  return data;
};
