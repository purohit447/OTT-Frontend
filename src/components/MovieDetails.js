import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import NoPage from "../pages/NoPage";
import requests from "../requests";
import Row from "./Row";
import Footer from "./Footer";
import "./MovieDetails.css";

const apiKey = "20d2403db960e89f2146b1f458098588";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details from TMDB API
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div>
        <NoPage />
      </div>
    );
  }

  return (
    <header
      className="movie__container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="movie__contents">
        <h1 className="movie__title">
          {movie?.title || movie?.name || movie?.originalname}
        </h1>

        <div className="movie__buttons">
          <button className="movie__button">Play</button>
        </div>

        <h1 className="movie__description">{movie?.overview}</h1>
        <h1 className="runtime__indicator">
          Runtime - {`${movie?.runtime}`} minutes
        </h1>
        <div className="similar__suggestion">
          <Row title="Similar Movies" fetchUrl={requests.fetchTrending} />
        </div>
        <Footer />
      </div>
      <div className="movie--fadeBottom" />
    </header>
  );
};

export default MovieDetails;
