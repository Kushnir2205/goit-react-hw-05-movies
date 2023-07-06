import { useState } from 'react';

import PropTypes from 'prop-types';
import css from './SearchMovie.module.css';

const SearchMovie = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={css.container}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search movies"
        className={css.input}
      />
      <button className={css.button} type="submit" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchMovie;
SearchMovie.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
