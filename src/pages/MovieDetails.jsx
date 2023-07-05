import { getMovieDetails } from 'api/serviceApi';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const {
    poster_path = '',
    original_title = '',
    name = '',
    release_date = '',
    genres = [],
    overview = '',
  } = details;

  const location = useLocation();
  const comeBack = useRef(location.state?.from || '/');

  const { movieId } = useParams();
  useEffect(() => {
    getMovieDetails(movieId).then(setDetails);
  }, [movieId]);

  return (
    <>
      <div>
        <p>
          <Link to={comeBack.current}>Go back</Link>
        </p>
        <article>
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={name}
            />
          ) : null}
          <div className="subscribe">
            <h2>
              {original_title}
              <span> ({release_date.substring(0, 4)})</span>
            </h2>
            <h3>
              Genries:
              <span> {genres.map(({ name }) => name).join(', ')}</span>
            </h3>
            <h3>Overview:</h3>
            <p>{overview}</p>
          </div>
        </article>
        <hr />
        <p>Additional information:</p>
        <ul>
          <li>
            <Link to={'cast'}>Cast</Link>
          </li>
          <li>
            <Link to={'reviews'}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetails;
