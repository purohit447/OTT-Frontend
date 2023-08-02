import React, { useContext, useState } from "react";
import GoogleButton from "react-google-button";
import {Link} from 'react-router-dom'
import "../pages/Login.css"
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import firebaseConfig from "../Utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";


firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
function Login() {
  const [email , setEmail] = useState("");
  const [pass , setPass] = useState("");
  const [loading , setLoading] = useContext(LoadingContext)
  const [user , setUser] = useContext(UserContext);
  const navigate = useNavigate();


  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        toast("Congratulation !", {
          type: "success",
        });
        setLoading(false);
        const user = userCredential.user;
        setUser({
          email: user.email,
          uid: user.uid,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage, {
          type: "warning",
        });
        setUser(null);
        setLoading(false);
      });

  }

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        setUser({
          email: user.email,
          uid: user.uid,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );
        toast("Congratulation !", {
          type: "success",
        });
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setUser(null);
        setLoading(false);
        toast(errorMessage, {
          type: "warning",
        });
      });
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="main-container">
      <div className="main-container glass">
        <div className="container glass2">
        <img id="logo" src="./movix-logo.png" />
        <h5>Login to Continue :)</h5>
        <input
          placeholder="Enter your E-mail Address"
          type="email"
          name=""
          id=""
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          onKeyDown={handleEnter}
          placeholder="Create a Password"
          type="password"
          name=""
          id=""
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            handleSubmit();
          }}
        >
          Signin
        </button>
        <GoogleButton type="light" onClick={() => handleGoogleSignIn()} />
        <p id="login-p">
          Don't have an Account ?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span>Register</span>
          </Link>
        </p>
      </div>
      </div>
      
    </div>
  );
}

export default Login;
