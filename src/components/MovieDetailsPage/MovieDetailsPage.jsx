import React, { useEffect, useState, useRef } from "react";
import styles from "./MovieDetailsPage.module.css";
import { useParams } from "react-router";
import { fetchVideosByID } from "../../services/fetchVideos";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/movies");

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

  return (
    <div>
      <Link to={backLinkRef.current}>
        <button>Go Back</button>
      </Link>
      {movie && (
        <div className={styles.thumb}>
          <div className={styles.picture}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
          <div className={styles.box}>
            <h2>{movie.title}</h2>
            <span className={styles.text}>Overview</span> <br></br>
            {movie.overview}
            <span className={styles.text}>Genres</span> <br></br>
            {movie.genres && movie.genres.map((genre) => genre.name).join("")}
          </div>
        </div>
      )}
      <ul>
        <li>
          <NavLink to="cast">Movie Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Movie Review</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
