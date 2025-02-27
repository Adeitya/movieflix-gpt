import React from "react";
import lang from "../utils/langConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center mt-40 bg-black bg-opacity-70 p-4 w-1/2 rounded-lg">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-2 flex-1 mr-4 rounder-md"
          lang={langKey}
        />
        <button className="text-white bg-red-600 py-2 px-8 rounded-md">
          {lang[langKey].search}
        </button>
      </div>
    </div>
  );
};

export default GptSearchBar;
