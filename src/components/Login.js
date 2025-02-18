import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg"
          alt="background-image"
        />
      </div>
      <form className="bg-black bg-opacity-80 absolute w-3/12 p-12 my-36 mx-auto left-0 right-0 text-white">
        <h1 className="font-bold text-3xl pb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 mb-4 w-full bg-transparent border border-gray-400 rounded-md focus:outline-white"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 mb-4 w-full bg-transparent border border-gray-400 rounded-md focus:outline-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 mb-4 w-full bg-transparent border border-gray-400 rounded-md focus:outline-white"
        />
        <button className="bg-red-700 p-2 mb-4 w-full rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="mt-4 text-gray-400">
          {isSignInForm ? "New to Netflix?" : "Already a User?"}{" "}
          <span
            className="text-white cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
