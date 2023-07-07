import { getMovieDetails } from 'api/serviceApi';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [details, setDetails] = useState(null);

  const location = useLocation();
  const comeBack = useRef(location.state?.from || '/');

  const { movieId } = useParams();
  useEffect(() => {
    getMovieDetails(movieId).then(setDetails);
  }, [movieId]);
  if (!details) return;
  const {
    poster_path = '',
    original_title = '',
    name = '',
    release_date = '',
    genres = [],
    overview = '',
  } = details;
  return (
    <>
      <div className={css.container}>
        <p>
          <Link className={css.goBack} to={comeBack.current}>
            Go back
          </Link>
        </p>
        <article className={css.article}>
          {poster_path && (
            <img
              className={css.poster}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : require('person_found.jpeg')
              }
              alt={name}
            />
          )}
          <div className={css.details}>
            <h2 className={css.title}>
              {original_title}
              <span className={css.year}>{release_date.substring(0, 4)}</span>
            </h2>
            <h3 className={css.genres}>
              Genries:
              <span> {genres.map(({ name }) => name).join(', ')}</span>
            </h3>
            <h3 className={css.overviewTitle}>Overview:</h3>
            <p className={css.overview}>{overview}</p>
          </div>
        </article>
        <hr />
        <p className={css.additionalInfo}>Additional information:</p>
        <ul className={css.additionalLinks}>
          <li>
            <Link className={css.link} to={'cast'}>
              Cast
            </Link>
          </li>
          <li>
            <Link className={css.link} to={'reviews'}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
MovieDetails.propTypes = {
  details: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    overview: PropTypes.string,
  }),
};
