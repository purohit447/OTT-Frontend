import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Leaderboard from "./pages/Leaderboard";
// import Login from "./pages/Login";
import User from "./pages/User";
import NoPage from "./pages/NoPage";
import LoadingContext from "./context/LoadingContext";
import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";


function App() {
  const loading = useState(false);
  const user = useState(null);
  return (
    <LoadingContext.Provider value={loading}>
      <ToastContainer />
      <UserContext.Provider value={user}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/user" element={<User />} />
              <Route path="/*" element={<NoPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Loading />
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
