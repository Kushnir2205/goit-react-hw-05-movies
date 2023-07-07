import { useState } from 'react';

import PropTypes from 'prop-types';
import css from './SearchMovie.module.css';

const SearchMovie = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className={css.container} onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search movies"
        className={css.input}
      />
      <button className={css.button} type="button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchMovie;
SearchMovie.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
