import React, { useEffect, useRef } from "react";
import lang from "../utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import model from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, toggleShowLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchTxt = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  useEffect(() => {
    return () => {
      dispatch(
        addGptMovieResult({
          movieNames: null,
          movieDetailsList: null,
        })
      );
    };
  }, []);

  const fetchMovieDetails = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearch = async () => {
    if (!searchTxt.current.value) return;
    dispatch(toggleShowLoading());
    const gptQuery =
      "Act as a movie recommendation system & suggest some movies for the query: " +
      searchTxt.current.value +
      ". only give me the 5 names of the movies in a comma separated list";
    const gptResults = await model.generateContent(gptQuery);
    const movieList = gptResults.response.text().split(",");
    console.log(movieList);
    const movieDetailsListPromise = movieList.map((movie) =>
      fetchMovieDetails(movie)
    );
    const movieDetailsList = await Promise.all(movieDetailsListPromise);
    dispatch(
      addGptMovieResult({
        movieNames: movieList,
        movieDetailsList: movieDetailsList,
      })
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center mt-40 bg-black bg-opacity-70 p-4 w-1/2 rounded-lg">
        <input
          ref={searchTxt}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-2 flex-1 mr-4 rounder-md"
          lang={langKey}
          onBlur={() =>
            !searchTxt.current.value
              ? dispatch(
                  addGptMovieResult({
                    movieNames: null,
                    movieDetailsList: null,
                  })
                )
              : null
          }
        />
        <button
          className="text-white bg-red-600 py-2 px-8 rounded-md"
          onClick={handleSearch}
        >
          {lang[langKey].search}
        </button>
      </div>
    </div>
  );
};

export default GptSearchBar;
