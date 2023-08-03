import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Row.css";
import  Axios  from "axios";

const base_url = "https://image.tmdb.org/t/p/w342";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
   fetchData();
  }, [fetchUrl]);

  const fetchData = async () => {
    const response = await Axios.get("http://127.0.0.1:8001/movies/api/data/");
    console.log(response.data);
    setMovies(response.data);
  }
  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      
      <div className="row__posters">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.movie_id}`}
            className="row__poster-link"
          >
            <img
              key={movie.movie_id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={movie.posterlink}
              alt={movie.seriestitle}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Row;
