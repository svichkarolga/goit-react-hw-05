import React from "react";
import { useState, useEffect } from "react";
import { fetchSearchMovie } from "../services/fetchVideos";
import SearchBar from "../components/SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

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
      <Link to={"/movies?movie="} state={location}></Link>

      <SearchBar onSubmit={onSubmit} />
      {loading && <p>Movies are loading...</p>}
      {error && <p>Error fetching movies</p>}

      <ul>
        {searchResults.length > 0
          ? searchResults.map((result) => (
              <li key={result.id}>
                <Link to={`/movies/${result.id}`}>{result.title}</Link>
              </li>
            ))
          : !loading && <p>No movies found</p>}
      </ul>
    </div>
  );
};
export default MoviesPage;
