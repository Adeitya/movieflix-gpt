import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailerVideo from "../hooks/useMovieTrailerVideo";

const VideoBackground = ({ movieId }) => {
  const trailerData = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailerVideo(movieId);

  return (
    <div className="w-screen">
      <iframe
        style={{ pointerEvents: "none" }}
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerData?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&fs=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&cc_load_policy=0&autohide=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
