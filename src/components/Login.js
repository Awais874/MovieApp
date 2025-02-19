import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import { auth } from "../utils/FireBase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Browse from "./Browse";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
const dispatch = useDispatch();



  const name =useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  
if(message) return;

if(!isSignInForm){

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;



    

updateProfile(user, {
  displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
}).then(() => {

  const {uid, email, displayName, photoURL } = auth.currentUser;
  dispatch(addUser({uid:uid, email: email, displayName:displayName}));
}).catch((error) => {
  setErrorMessage(error);
});

      console.log("user is :",user);
      navigate("/browse");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode +"-"+ errorMessage)
      // ..
    });


}
else
{
    

    
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("user is :",user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

}



};

  const ToggleSigninForm = () => {
    setSigninForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/SA-en-20240916-TRIFECTA-perspective_8bcf2939-86f0-4eb3-a158-0623d33e18c5_large.jpg"
          alt="Logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-white w-4/12 absolute p-12 bg-black my-36 mx-auto right-8 left-8 bg-opacity-80 rounded-lg"
      >
        <h1 className="py-4 font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="User Name"
            className="w-full bg-gray-700 text-black  p-2 my-2"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="w-full bg-gray-700 text-black  p-2 my-2"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="text-black p-2 bg-gray-700 my-2 w-full"
        />
        <p className="text-red-700">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className="bg-red-400 p-4 my-4 bg-slate-600 rounded-lg w-full"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
        </button>
        <p className="py-4" onClick={ToggleSigninForm}>
          {isSignInForm
            ? "New to Netflix...? Sign up Now"
            : "Already Registered ....Sign In "}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
