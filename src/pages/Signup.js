import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "firebase/compat/app";
import firebaseConfig from "../Utils/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import axios from "../axiosToServer";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useContext(LoadingContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    if (pass !== repass) {
      return toast("Password does not Match", {
        type: "warning",
      });
    }
    if (pass.length < 6) {
      return toast("Password should be more than 6", {
        type: "warning",
      });
    }
    if (email === "") {
      return toast("Email should not be empty", {
        type: "warning",
      });
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setUser({
          email: user.email,
          uid: user.uid,
          name: name,
        });
        toast("Congratulation ! You are Registered", {
          type: "success",
        });
        //   localStorage.setItem("login" , JSON.stringify({
        //     email : user.email,
        //     uid : user.uid
        //   })
        //   );

        hitPostRequestToServer(user.uid, name);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        if (errorCode === "auth/email-already-in-use") {
          toast("Email Address is already in use :(", {
            type: "warning",
          });
        }
        setUser(null);
      });
  };

  const hitPostRequestToServer = async (id, name) => {
    const params = {
      user_id: id,
      user_name: name,
      mov1: "The Shawshank Redemption",
      mov2: "The Godfather",
      mov3: "The Dark Knight",
      mov4: "Pulp Fiction",
      mov5: "American History X",
      weekT1: "d",
      weekT2: "d",
      weekT3: "d",
      weekT4: "d",
      dailyT1: "d",
      dailyT2: "d",
      dailyT3: "d",
      dailyT4: "d",
      totalWatchTime: 0.0,
      weeklyWatchTime: 0.0,
      rewardPoints: 0,
    };

    try {
      const response = await axios.post("user/api/data/", params);
      console.log(response);
      navigate("/");
      setLoading(false);
      toast("Post req done on server ", { type: "success" });
    } catch (error) {
      toast("Oops ! There is some problem from our side" , {type : "warning"});
      setLoading(false);
    }
  };

  return (
    <div className="main-container ">
      <div className="main-container glass">
        <div className="container glass2">
          <img id="logo" src="./movix-logo.png" />
          <h5>Register with us and Enjoy :)</h5>
          <input
            placeholder="Enter your E-mail Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Enter your Full Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Create a Password"
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <input
            onKeyDown={handleEnter}
            placeholder="Re- enter Password"
            type="password"
            value={repass}
            onChange={(e) => {
              setRepass(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Signup
          </button>
          <p id="login-p">
            Already have an Account ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>Signin</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
