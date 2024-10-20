import React, { useEffect, useState, useRef, Suspense } from "react";
import styles from "./MovieDetailsPage.module.css";
import { useParams } from "react-router";
import { fetchVideosByID } from "../../services/fetchVideos";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import Loader from "../Loader/Loader";

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
        console.log(data);
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
      {loading && <Loader isLoading={loading} />}
      <Link to={backLinkRef.current}>
        <button className={styles.btn}>Go Back</button>
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
            <h1 className={styles.title}>{movie.title}</h1>
            <span className={styles.text}>Overview</span>
            {movie.overview}
            <span className={styles.text}>Budget</span> {movie.budget}
            <span className={styles.text}>Origin country</span>{" "}
            {movie.origin_country}
            <span className={styles.text}>Genres</span>
            {movie.genres && movie.genres.map((genre) => genre.name).join("")}
            <span className={styles.text}>Vote average</span>
            {movie.vote_average}
          </div>
        </div>
      )}
      <ul>
        <li className={styles.components}>
          <NavLink to="cast">Movie Cast</NavLink>
        </li>
        <li className={styles.components}>
          <NavLink to="reviews">Movie Review</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading inner component</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
