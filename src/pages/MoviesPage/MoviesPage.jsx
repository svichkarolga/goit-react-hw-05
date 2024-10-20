import React from "react";
import { useState, useEffect } from "react";
import { fetchSearchMovie } from "../../services/fetchVideos";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [query, setQuery] = useState("");
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

      <ul className={styles.ul}>
        {searchResults.length > 0
          ? searchResults.map((result) => (
              <li className={styles.list} key={result.id}>
                <Link to={`/movies/${result.id}`} state={location}>
                  {result.title}
                </Link>
              </li>
            ))
          : !loading && (
              <p className={styles.text}>Please enter your movie search!</p>
            )}
      </ul>
    </div>
  );
};
export default MoviesPage;
