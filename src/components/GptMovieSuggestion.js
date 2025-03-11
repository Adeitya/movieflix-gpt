import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { gptMovieResult, gptMovieNames } = useSelector((store) => store.gpt);

  return (
    <div className="bg-black text-white bg-opacity-70 mx-14 rounded-md mt-8">
      {gptMovieNames?.map((item, index) => (
        <MovieList key={item} title={item} movieList={gptMovieResult[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
