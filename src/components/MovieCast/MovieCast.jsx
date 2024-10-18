import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { fetchCastByID } from "../../services/fetchVideos";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getCastByID() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchCastByID(movieId);
        setCast(data);
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
      <ul>
        {cast.length > 0 &&
          cast.map((actor) => (
            <li key={actor.cast_id}>
              {actor.name}
              {actor.character}
            </li>
          ))}
      </ul>
      ;
    </div>
  );
};

export default MovieCast;
