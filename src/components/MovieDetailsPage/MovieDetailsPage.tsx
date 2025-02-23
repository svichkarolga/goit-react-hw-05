import React, { useEffect, useState, useRef, Suspense } from "react";
import styles from "./MovieDetailsPage.module.css";
import { useParams } from "react-router";
import { fetchVideosByID } from "../../services/fetchVideos";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import { MovieType } from "../../types";

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    if (!movieId) return;
    async function getVideosByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchVideosByID(movieId as string);
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
      <div className={styles.boxThumb}>
        <Link to={backLinkRef.current}>
          <button className={styles.btn}>Go Back</button>
        </Link>
      </div>
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
