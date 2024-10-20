import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchCastByID } from "../../services/fetchVideos";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    async function getCastByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchCastByID(movieId);
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
      <Link to={location.state}>Go back</Link>
      <ul>
        {cast && cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.cast_id}>
              <strong>{actor.name}</strong> as {actor.character}
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt="poster"
                width={250}
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
