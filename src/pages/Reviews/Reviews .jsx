import { getReviews } from 'api/serviceApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();
  useEffect(() => {
    getReviews(movieId)
      .then(data => setReviews(data.results))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      <h2 className={css.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(review => (
            <li className={css.reviewItem} key={review.id}>
              <h3 className={css.author}>{review.author}</h3>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No reviews available</p>
      )}
    </div>
  );
};

export default Reviews;
