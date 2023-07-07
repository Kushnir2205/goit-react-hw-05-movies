import { getMovieCredits } from 'api/serviceApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();
  useEffect(() => {
    getMovieCredits(movieId).then(data => {
      setCast(data.cast);
    });
  }, [movieId]);
  return (
    <div>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul className={css.castContainer}>
          {cast.map(actor => (
            <li key={actor.id} className={css.castItem}>
              <img
                className={css.castImage}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                    : require('../../images/person_found.jpeg')
                }
                alt={actor.name}
              />
              <p className={css.castName}>{actor.name}</p>
              <p className={css.castCharacter}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default Cast;
