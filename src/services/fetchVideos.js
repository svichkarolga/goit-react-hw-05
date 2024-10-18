import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWExOTVhZGZlZDkxNjgxZDNlNzA1MjdlZTc0MDU1NCIsIm5iZiI6MTcyOTA5MTIwNy4wNTA5NzksInN1YiI6IjY3MGU2YTAxZjU4YTkyMDZhYTQxZTk0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWAmd-HCoL9jEOTyeiAbI12W_voz8KpKdgn5v2iA9Mk",
  },
};

export const fetchVideos = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const fetchVideosByID = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const fetchCastByID = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      options
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
