import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailerVideo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((item) => item.type === "Trailer");
    const trailerData = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailerData));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMovieTrailerVideo;
