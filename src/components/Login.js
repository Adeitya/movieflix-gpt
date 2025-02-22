import React, { useRef, useState } from "react";
import Header from "./Header";
import { emailRegex, nameRegex, passwordRegex } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND, LOGO } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [inputErrorState, setInputErrorState] = useState({
    name: "",
    email: "",
    password: "",
    apiErrorMsg: "",
  });

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setInputErrorState({
      name: "",
      email: "",
      password: "",
      apiErrorMsg: "",
    });
  };

  const handleButtonClick = () => {
    if (
      !inputErrorState.email &&
      !inputErrorState.password &&
      email.current.value &&
      password.current.value
    ) {
      if (isSignInForm) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((UserCredential) => {
            const user = UserCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setInputErrorState({
              ...inputErrorState,
              apiErrorMsg: "User Not Found (Invalid Credential).",
            });
          });
      } else {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((UserCredential) => {
            const user = UserCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                dispatch(
                  addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                  })
                );
              })
              .catch((error) => {});
          })
          .catch((error) => {
            setInputErrorState({
              ...inputErrorState,
              apiErrorMsg: "Email already in use.",
            });
          });
      }
    } else {
      setInputErrorState({
        ...inputErrorState,
        email:
          email.current.value && emailRegex.test(email.current.value)
            ? ""
            : "Please enter a valid email address.",
        password:
          password.current.value && passwordRegex.test(password.current.value)
            ? ""
            : "Password must be at least 8 characters long, with an uppercase letter, a number, and a special character.",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND} alt="background-image" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black bg-opacity-80 absolute w-3/12 p-12 my-36 mx-auto left-0 right-0 text-white"
      >
        <h1 className="font-bold text-3xl pb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Name"
            className={`p-4 mb-4 w-full bg-transparent border rounded-md ${
              inputErrorState.name
                ? "focus:outline-none border-red-600"
                : "focus:outline-white border-gray-400"
            }`}
            onBlur={() =>
              !nameRegex.test(name.current.value)
                ? setInputErrorState({
                    ...inputErrorState,
                    name: "Please enter a valid name.",
                  })
                : setInputErrorState({
                    ...inputErrorState,
                    name: "",
                  })
            }
            onFocus={() =>
              setInputErrorState({
                ...inputErrorState,
                name: "",
              })
            }
          />
        )}
        {inputErrorState.name && (
          <p className="text-red-600 -mt-2 mb-4 text-xs">
            ❗️{inputErrorState.name}
          </p>
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className={`p-4 mb-4 w-full bg-transparent border rounded-md ${
            inputErrorState.email
              ? "focus:outline-none border-red-600"
              : "focus:outline-white border-gray-400"
          }`}
          onBlur={() =>
            !emailRegex.test(email.current.value)
              ? setInputErrorState({
                  ...inputErrorState,
                  email: "Please enter a valid email address.",
                })
              : setInputErrorState({
                  ...inputErrorState,
                  email: "",
                })
          }
          onFocus={() =>
            setInputErrorState({
              ...inputErrorState,
              email: "",
              apiErrorMsg: "",
            })
          }
        />
        {inputErrorState.email && (
          <p className="text-red-600 -mt-2 mb-4 text-xs">
            ❗️{inputErrorState.email}
          </p>
        )}
        <input
          type="text"
          ref={password}
          placeholder="Password"
          className={`p-4 mb-4 w-full bg-transparent rounded-md border ${
            inputErrorState.password
              ? "border-red-600 focus:outline-none"
              : "border-gray-400  focus:outline-white"
          }`}
          onBlur={() =>
            !passwordRegex.test(password.current.value)
              ? setInputErrorState({
                  ...inputErrorState,
                  password:
                    "Password must be at least 8 characters long, with an uppercase letter, a number, and a special character.",
                })
              : setInputErrorState({
                  ...inputErrorState,
                  password: "",
                })
          }
          onFocus={() =>
            setInputErrorState({
              ...inputErrorState,
              password: "",
              apiErrorMsg: "",
            })
          }
        />
        {inputErrorState.password && (
          <p className="text-red-600 -mt-2 mb-4 text-xs">
            ❗️{inputErrorState.password}
          </p>
        )}
        {inputErrorState.apiErrorMsg && (
          <p className="text-red-600 -mt-2 mb-4 text-xs">
            ❗️{inputErrorState.apiErrorMsg}
          </p>
        )}
        <button
          className="bg-red-700 p-2 mb-4 w-full rounded-md"
          onClick={handleButtonClick}
        >
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
