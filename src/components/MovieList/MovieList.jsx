import React from "react";
import { useEffect, useState } from "react";
import { fetchVideos } from "../../services/fetchVideos";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";

const MovieList = ({ response }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getVideos() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchVideos();
        setVideos(data);
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
      <h1>Trending today</h1>
      <ul className={styles.list}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video.id}>
              <Link to={`/movies/${video.id}`}>{video.title}</Link>
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
