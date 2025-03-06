import React, { useEffect, useState } from "react";
import "./Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch("http://localhost:8081/getAllMovies"),
          fetch("http://localhost:8081/getAllGUser"),
        ]);

        const movies = await moviesRes.json();
        const users = await usersRes.json();

        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const newUserEmail = localStorage.getItem("userEmail");
      users.forEach((user) => {
        if (newUserEmail === user.email) {
          localStorage.setItem("loggedUser", JSON.stringify(user));
        }
      });
    }
  }, [users]);

  return (
    <div className="banner_wrapper">
      <div
        className="banner__background"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${movie?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      />

      <div className="banner__leftGradient" />
      <div className="banner__topGradient" />
      <div className="banner__bottomGradient" />

      <div className="banner__content">
        <h4>Duration: {movie?.watch_time} min</h4>
        <h3>{movie?.vote_average}</h3>
        <div>
          {movie?.genres?.map((genre, index) => (
            <span key={index}>{genre} | </span>
          ))}
        </div>
        <h2>{movie?.name}</h2>
        <p>{movie?.overview}</p>

        <div className="banner__content-buttons">
          <button
            onClick={() => {
              navigate(`/movieTrailer/${movie?.movie_id}`);
            }}
            className="banner__content-buttons_watchButton buttons"
          >
            <FontAwesomeIcon className="icon" icon={faPlay} />
            WATCH
          </button>
          <button className="banner__content-buttons_addListButton buttons">
            <FontAwesomeIcon className="icon" icon={faPlus} />
            ADD LIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
