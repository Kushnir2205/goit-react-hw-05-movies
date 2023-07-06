import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from 'api/serviceApi';
import ListMovies from 'components/ListMovies/ListMovies';
import SearchMovie from 'components/SearchMovie/SearchMovie';

import PropTypes from 'prop-types';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [queryParams, setQueryParams] = useSearchParams('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (queryParams.has('query')) {
        setIsLoading(true);
        searchMovies(queryParams.get('query'))
          .then(data => setMovies(data.results))
          .catch(error => console.log(error))
          .finally(() => setIsLoading(false));
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [queryParams]);

  const handleSearch = query => {
    if (query) {
      queryParams.set('query', query);
      setQueryParams(queryParams);
    } else {
      queryParams.delete('query');
      setQueryParams(queryParams);
    }
  };

  return (
    <div>
      <SearchMovie onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        movies && movies.length > 0 && <ListMovies movies={movies} />
      )}
    </div>
  );
};

export default Movies;
Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};
