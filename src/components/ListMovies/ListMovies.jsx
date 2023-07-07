import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './ListMovies.module.css';

const ListMovies = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li className={css.list_item} key={movie.id}>
          <Link
            className={css.link}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.original_title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListMovies;
ListMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};
