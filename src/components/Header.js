import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="flex flex-row justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
      <img className="w-44" src={LOGO} alt="logo" />
      {user ? (
        <div onClick={handleClick} className="flex justify-center items-center">
          <img
            src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            alt="profile"
            className="cursor-pointer w-10 h-10"
          />
          <p className="text-white pl-5">{user?.displayName?.toUpperCase()}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
