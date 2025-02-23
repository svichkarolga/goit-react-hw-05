import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchReviewByID } from "../../services/fetchVideos";
import styles from "./MovieReview.module.css";
import { ReviewType } from "../../types";

const MovieReviews: React.FC = () => {
  const [review, setReview] = useState<ReviewType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getReviewByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchReviewByID(movieId as string);
        console.log(data);
        setReview(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviewByID();
  }, [movieId]);

  return (
    <div>
      <h2 className={styles.mainText}>Movie Reviews</h2>
      <ul className={styles.ul}>
        {review && review.length > 0 ? (
          review.map((result) => (
            <li className={styles.list} key={result.id}>
              <strong className={styles.author}>Author: {result.author}</strong>
              <p className={styles.review}>{result.content}</p>
            </li>
          ))
        ) : (
          <p className={styles.info}>No review information available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
