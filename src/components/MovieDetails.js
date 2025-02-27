import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieTrailerVideo from "../hooks/useMovieTrailerVideo";
import Header from "./Header";
import { useSelector } from "react-redux";
import moment from "moment";
import { IMG_CDN_URL, LOGO, PROFILE } from "../utils/constants";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const movieDetails = useSelector((store) => store.movies.movieDetails);
  const trailerData = useSelector((store) => store.movies.trailerVideo);
  useMovieDetails(movieId);
  useMovieTrailerVideo(movieId);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex bg-gradient-to-r from-black px-16">
        <img
          className="w-44 cursor-pointer"
          src={LOGO}
          alt="logo"
          onClick={() => navigate("/browse")}
        />
      </div>
      <div className="flex-grow bg-black bg-opacity-70 px-20 py-10">
        <div className="flex justify-between border-b-2 border-red-700 border-solid mb-4">
          <div>
            <h1 className="text-white text-5xl font-bold">
              {movieDetails?.original_title}
            </h1>
            <p className="text-gray-400 py-2">
              {moment(movieDetails?.release_date).format("YYYY")}
              {" • "}
              {parseInt(movieDetails?.runtime / 60) +
                "h" +
                " " +
                (movieDetails?.runtime % 60) +
                "m"}
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-center ">Rating</p>
            <p className="text-white">
              ⭐️ {movieDetails?.vote_average}{" "}
              <span className="text-gray-400">/ 10</span>
            </p>
            <p className="text-xs pl-5">{movieDetails?.vote_count}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <img
            alt="movie poster"
            src={IMG_CDN_URL + movieDetails?.poster_path}
            className="w-1/4 rounded-lg"
          />
          <iframe
            style={{ pointerEvents: "none" }}
            className="w-screen aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${trailerData?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&fs=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&cc_load_policy=0&autohide=1&playlist=${trailerData?.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="bg-gradient-to-r from-black rounded-lg pl-2 pb-2 mt-2">
          <div className="flex gap-2 py-4">
            {movieDetails?.genres?.map((item) => (
              <p
                className="text-white font-bold text-sm rounded-full border-gray-400 border-solid border-2 py-1 px-2"
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="text-white font-bold">
            <p>{movieDetails?.overview}</p>
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-2xl py-4 border-b-2 border-red-700 border-solid">
            Box office
          </p>
          <div className="flex justify-between pt-2 text-white">
            <div>
              {" "}
              <p className="text-gray-400">Budget</p>
              <p>
                {movieDetails?.budget.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Gross Worldwide</p>
              <p>
                {movieDetails?.revenue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-2xl py-4 border-b-2 border-red-700 border-solid">
            Production company
          </p>
          <div className="flex mt-4 gap-10">
            {movieDetails?.production_companies?.map(
              (item, index) =>
                item.logo_path && (
                  <img
                    alt="production company poster"
                    src={IMG_CDN_URL + item?.logo_path}
                    className="w-1/12  p-2 bg-gradient-to-r from-white"
                    key={item.id}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
