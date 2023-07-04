import { getTrending } from 'api/serviceApi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrending().then(data => {
      setTrendMovies(data.results);
      console.log(data);
    });
  }, []);
  return (
    <>
      <h2>Trending today</h2>
      <ul>
        {trendMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.original_title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
