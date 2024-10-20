import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchReviewByID } from "../../services/fetchVideos";

const MovieReviews = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getReviewByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchReviewByID(movieId);
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
      MovieReviews
      <ul>
        {review && review.length > 0 ? (
          review.map((result) => (
            <li key={result.id}>
              <strong>{result.author}</strong>
              <p>{result.content}</p>
            </li>
          ))
        ) : (
          <p>No review information available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
