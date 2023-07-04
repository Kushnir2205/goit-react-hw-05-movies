import { getMovieDetails } from 'api/serviceApi';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const {
    poster_path = '',
    original_title = '',
    name = '',
    release_date = '',
    genres = '',
    overview = '',
  } = details ?? {};

  const location = useLocation();
  const comeBack = useRef(location.state?.from || '/');

  const { id } = useParams();
  useEffect(() => {
    getMovieDetails(id).then(setDetails);
  }, [id]);

  return (
    <>
      <div>
        <p>
          <Link to={comeBack.current}>Go back</Link>
        </p>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetails;
