import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Leaderboard from "./pages/Leaderboard";
// import Login from "./pages/Login";
import User from "./pages/User";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
