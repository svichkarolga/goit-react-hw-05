import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchVideos } from "../../services/fetchVideos";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getVideos() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchVideos();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getVideos();
  }, []);
  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <h1 className={styles.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
