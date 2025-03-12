import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { LOGO, PROFILE, SUPPORTED_LANG } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const handleClick = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageClick = (e) => {
    setSelectedLanguage(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="flex md:flex-row flex-col md:justify-between items-center absolute md:px-8 px-1 py-2 bg-gradient-to-b from-black z-10 w-full">
      <img className="w-44" src={LOGO} alt="logo" />
      {user ? (
        <div className="flex md:gap-2 gap-0 justify-center items-center">
          <p className="text-white pr-2">{user?.displayName?.toUpperCase()}</p>
          {showGptSearch && (
            <div>
              <select
                className="p-1 bg-white bg-opacity-80 rounded-lg mr-4 cursor-pointer"
                onChange={handleLanguageClick}
                value={selectedLanguage}
              >
                {SUPPORTED_LANG.map((item) => (
                  <option key={item.identifier} value={item.identifier}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div
            onClick={handleGptSearchClick}
            className="flex justify-center items-center mr-4 bg-white p-1 rounded-lg bg-opacity-80"
          >
            <p className="text-black cursor-pointer font-bold">
              {showGptSearch ? "🏠 Homepage" : "🔍 GPT Search"}
            </p>
          </div>
          <div
            onClick={handleClick}
            className="flex justify-center items-center gap-2 bg-white p-1 rounded-lg bg-opacity-80 md:mt-0"
          >
            <img
              src={PROFILE}
              alt="profile"
              className="cursor-pointer w-6 h-6 rounded-full"
            />
            <p className="text-black cursor-pointer font-bold">Logout</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
