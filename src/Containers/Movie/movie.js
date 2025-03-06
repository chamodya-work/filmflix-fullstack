import React, { useEffect, useState } from "react";
import "./movie.css"
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import movieImages from "../../assets/movie/movieImages";

const Movie = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://localhost:8081/getAllMovies');
                setMovies(await result.json());
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (

        <div className="wrapper__movie">
            <Navbar />
            <div className="movie-heading">
                <h1>Movies</h1>
            </div>
            <div className="movie_scroll-wrapper">
                <div className="scroll-content">
                    {movies.map(movie => (
                        <img src={movie.poster_path} alt={movieImages[movie.name]} onClick={() => { navigate(`/movieTrailer/${movie.movie_id}`) }} />
                    ))}
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Movie;