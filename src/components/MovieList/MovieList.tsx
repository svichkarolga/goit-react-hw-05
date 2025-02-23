import React from "react";
import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import { MovieType } from "../../types";

type MovieListProp = {
  movies: MovieType[];
};
const MovieList: React.FC<MovieListProp> = ({ movies = [] }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={styles.box}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li className={styles.list} key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default MovieList;
