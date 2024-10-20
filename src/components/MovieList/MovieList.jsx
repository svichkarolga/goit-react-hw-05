import React from "react";
import { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";

const MovieList = ({ movies = [] }) => {
  return (
    <div>
      <h1 className={styles.title}>Trending today</h1>
      <ul className={styles.box}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li className={styles.list} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))
        ) : (
          <p>Whoops, something went wrong! Please try reloading this page!</p>
        )}
      </ul>
    </div>
  );
};
export default MovieList;
