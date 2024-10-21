import React from "react";
import { useState, useEffect } from "react";
import { fetchSearchMovie } from "../../services/fetchVideos";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const movie = searchParams.get("movie") ?? "";
    if (!movie) {
      return;
    }
    const getSearchMovie = async () => {
      setLoading(true);
      try {
        setLoading(true);
        setError(false);
        const data = await fetchSearchMovie(movie);
        setSearchResults(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getSearchMovie();
  }, [searchParams]);

  const onSubmit = (movie) => {
    setSearchParams({ movie });
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {loading && <Loader isLoading={loading} />}
      {error && <p>Error fetching movies</p>}
      {!loading && !searchParams.get("movie") && (
        <p className={styles.text}>Please enter your movie search!</p>
      )}

      <MovieList movies={searchResults} />
    </div>
  );
};
export default MoviesPage;
