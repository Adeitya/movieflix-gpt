import React from "react";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${movieId}`);
  };

  return (
    <div className="w-1/3 md:pt-[20%] pt-0 px-12 py-12 text-white absolute bg-gradient-to-r from-black ">
      <h1 className="font-bold text-3xl md:mt-0 mt-16">{title}</h1>
      <p className="py-5 hidden md:inline-block">{overview} </p>
      <div className="flex gap-2">
        <button
          onClick={handleClick}
          className="flex items-center bg-white text-black text-sm font-bold md:px-5 px-2 md:py-1 py-0 rounded-sm hover:bg-opacity-80"
        >
          <span className="mr-1">▶️</span> Play
        </button>
        <button
          onClick={handleClick}
          className="flex items-center bg-gray-600 text-white px-5 py-1 font-bold rounded-sm hover:bg-opacity-80"
        >
          <span className="mr-1">ℹ</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
