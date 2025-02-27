import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="-mt-48 pb-10 bg-black">
      <MovieList title={"Now Playing"} movieList={movies.nowPlayingMovies} />
      <MovieList title={"Upcoming"} movieList={movies.upcomingMovies} />
      <MovieList title={"Top Rated"} movieList={movies.topRatedMovies} />
      <MovieList title={"Popular"} movieList={movies.popularMovies} />
    </div>
  );
};

export default SecondaryContainer;
