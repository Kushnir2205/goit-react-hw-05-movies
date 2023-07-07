import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import { lazy } from 'react';

const Cast = lazy(() => import('pages/Cast/Cast'));
const Reviews = lazy(() => import('pages/Reviews/Reviews '));
const Movies = lazy(() => import('pages/Movie/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
