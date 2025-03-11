import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { ClipLoader } from "react-spinners";

const GptMovieSuggestion = () => {
  const { gptMovieResult, gptMovieNames, showLoading } = useSelector(
    (store) => store.gpt
  );

  return showLoading ? (
    <div className="flex flex-col justify-center items-center mt-20 space-y-2">
      <ClipLoader color="red" loading={showLoading} size={80} />
    </div>
  ) : (
    <div className="bg-black text-white bg-opacity-70 mx-14 rounded-md mt-8">
      {gptMovieNames?.map((item, index) => (
        <MovieList key={item} title={item} movieList={gptMovieResult[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
