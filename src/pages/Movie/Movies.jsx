import { useEffect, useState } from 'react';
import { searchMovies } from 'api/serviceApi';
import ListMovies from 'components/ListMovies/ListMovies';
import SearchMovie from 'components/SearchMovie/SearchMovie';

import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serachParams, setSerachParams] = useSearchParams();

  useEffect(() => {
    const query = serachParams.get('query');
    if (query) {
      setIsLoading(true);
      searchMovies(query)
        .then(data => setMovies(data.results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  }, [serachParams]);

  const handleSearch = query => {
    setSerachParams({ query });
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
