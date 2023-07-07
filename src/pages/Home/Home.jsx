import { getTrending } from 'api/serviceApi';
import ListMovies from 'components/ListMovies/ListMovies';
import { useEffect, useState } from 'react';

import css from './Home.module.css';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    getTrending().then(data => {
      setTrendMovies(data.results);
    });
  }, []);
  return (
    <>
      <h2 className={css.titleTrend}>Trending today</h2>
      <ListMovies movies={trendMovies} />
    </>
  );
};

export default Home;
