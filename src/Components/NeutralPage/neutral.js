import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./neutral.css";
import PreventBackButton from "../PreventBackButton";

const Neutral = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [faqs, setFaqs] = useState([
    {
      question: "What is FilmFlix?",
      answer:
        "FilmFlix is a free online streaming platform that offers a wide variety of movies and TV shows. With FilmFlix, you can enjoy your favorite content without any subscription or hidden fees. It's designed to provide a seamless streaming experience for users, much like other popular platforms but completely free of charge!",
      open: false,
    },
    {
      question: "How do I sign up for FilmFlix?",
      answer:
        "Signing up for FilmFlix is quick and free! Simply visit our homepage, click on the 'Sign Up' button, and enter your basic details such as your name, email, and password. After that, you'll have instant access to our full library of content. There’s no need for credit card details, and the service is completely free to use.",
      open: false,
    },
    {
      question: "Is FilmFlix available worldwide?",
      answer:
        "Yes! FilmFlix is available worldwide, and you can stream content from anywhere. However, due to regional licensing agreements, some movies or shows may be unavailable in certain countries. But rest assured, we're constantly adding new content to keep things fresh and exciting for all our users.",
      open: false,
    },
    {
      question: "Is FilmFlix really free?",
      answer:
        "Yes! FilmFlix is completely free. There are no subscription fees, no hidden charges, and no trials. Simply sign up, and you can start watching content immediately. We believe in providing high-quality entertainment without any cost to our users.",
      open: false,
    },
    {
      question: "Can I stream on multiple devices?",
      answer:
        "Absolutely! Since FilmFlix is free, you can stream movies and TV shows on multiple devices at the same time. There are no restrictions on the number of devices you can use, so feel free to enjoy your favorite content on your phone, tablet, laptop, or smart TV.",
      open: false,
    },
   
  ]);

  // ✅ Scroll Fix: Ensures the page starts at the top and enables scrolling
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    document.body.style.overflow = "auto"; // Enable scrolling

    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling remains enabled on unmount
    };
  }, []);


  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await fetch("http://localhost:8081/getAllMovies");
        const movieData = await result.json();
        setMovies(movieData.slice(0, 5));
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const result = await fetch("http://localhost:8081/getAllSeries");
        const tvseriesData = await result.json();
        setSeries(tvseriesData.slice(0, 5));
      } catch (error) {
        console.log("Error fetching tvseries:", error);
      }
    };
    fetchTvSeries();
  }, []);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq))
    );
  };

  return (
    <div>
      <PreventBackButton />

      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="/assets/FlimFlix.png" alt="FlimFlix Logo" />
        </div>

        <Link to="/login">
          <button className="login-button">LogIn</button>
        </Link>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <h1>
          FilmFlix <br />
          Stream Anywhere!
        </h1>
        <p>
          Unlimited movies and shows, all at your fingertips. <br /> Sign up now
          and start watching instantly!
        </p>
        <Link to="/signup">
          <button className="signup-button">Join Now &gt;</button>
        </Link>
      </div>

      {/* Recommended Movies */}
      <div className="movies-container">
        <h2>Top Picks for You</h2>
        <div className="movie-card">
          {movies.map((movie) => (
            <div key={movie.movie_id} className="movie-card-item">
              <img src={movie.poster_path} alt={movie.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Recommended TV series */}
      <div className="movies-container">
        <h2>Top Picks for TV Series</h2>
        <div className="movie-card">
          {series.map((tvSeries) => (
            <div key={tvSeries.series_id} className="movie-card-item">
              <img src={tvSeries.poster_path} alt={tvSeries.name} />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${faq.open ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h3>{faq.question}</h3>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Neutral;
