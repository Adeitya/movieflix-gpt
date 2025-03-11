import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieDetails }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${movieDetails.id}`);
  };
  if (!movieDetails.poster_path) return null;
  return (
    <div onClick={handleClick} className="w-32 cursor-pointer">
      <img src={IMG_CDN_URL + movieDetails.poster_path} alt="movie poster" />
    </div>
  );
};

export default MovieCard;
