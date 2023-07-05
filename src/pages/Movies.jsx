import { searchMovies } from 'api/serviceApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) {
        setIsLoading(true);
        searchMovies(query)
          .then(data => setMovies(data.results))
          .catch(error => console.log(error))
          .finally(() => setIsLoading(false));
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query) {
      setIsLoading(true);
      searchMovies(query)
        .then(data => setMovies(data.results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search movies"
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : movies && movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Movies;
