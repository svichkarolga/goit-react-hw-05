import React, { useEffect } from "react";
import styles from "./MovieDetailsPage.module.css";
import { useParams } from "react-router";
import { useState } from "react";

const MovieDetailsPage = ({ response }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    async function getVideosByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchVideosByID(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getVideosByID();
  }, [movieId]);

  return <div>MovieDetailsPage {movieId}</div>;
};

export default MovieDetailsPage;
