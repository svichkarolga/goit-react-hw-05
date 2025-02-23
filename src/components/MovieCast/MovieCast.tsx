import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchCastByID } from "../../services/fetchVideos";
import styles from "./MovieCast.module.css";
import { CastType } from "../../types";

const MovieCast: React.FC = () => {
  const [cast, setCast] = useState<CastType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { movieId } = useParams();

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    async function getCastByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchCastByID(movieId as string);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCastByID();
  }, [movieId]);

  return (
    <div>
      <h2 className={styles.mainText}>Movie Cast</h2>
      <ul className={styles.list}>
        {cast && cast.length > 0 ? (
          cast.map((actor) => (
            <li className={styles.card} key={actor.cast_id}>
              <strong>{actor.name}</strong> as {actor.character}
              <img
                className={styles.picture}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt="poster"
              />
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
