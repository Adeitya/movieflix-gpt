import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movieList }) => {
  return (
    <div className="px-12">
      <h1 className="font-bold text-lg text-white py-3">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-2 rounded-lg ">
          {movieList?.map((item) => (
            <MovieCard movieDetails={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
