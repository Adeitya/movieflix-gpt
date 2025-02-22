import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-1/3 pt-[20%] px-12 text-white absolute">
      <h1 className="font-bold text-3xl">{title}</h1>
      <p className="py-5">{overview} </p>
      <div className="flex gap-2">
        <button className="bg-white text-black font-bold px-5 py-1 rounded-sm hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-600 text-white px-5 py-1 font-bold rounded-sm hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
