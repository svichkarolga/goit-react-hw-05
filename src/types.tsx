export interface MovieType {
  id: string;
  title: string;
  overview: string;
  budget: string;
  origin_country: string;
  genres: { name: string }[];
  vote_average: string;
  backdrop_path: string;
}

export interface CastType {
  profile_path: string;
  cast_id: string;
  actor: string;
  name: string;
  character: string;
}

export interface ReviewType {
  id: string;
  author: string;
  content: string;
}
