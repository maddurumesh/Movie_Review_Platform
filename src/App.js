import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";          // Changed from ./components/Home
import Movies from "./pages/Movies";      // Changed from ./components/Movies
import MovieDetails from "./pages/MovieDetails";  // Changed from ./components/MovieDetails
import Profile from "./pages/Profile";    // Changed from ./components/Profile
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from Spring Boot backend
  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
        // Fallback to static data if backend is not available
        setMovies([
          {
            id: 1,
            title: "Inception",
            rating: 8.8,
            posterUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
          },
          {
            id: 2,
            title: "Interstellar",
            rating: 8.6,
            posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
          },
          {
            id: 3,
            title: "The Dark Knight",
            rating: 9.0,
            posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          },
        ]);
      });
  }, []);

  if (loading) {
    return (
      <div className="App">
        <h2 className="loading">⏳ Loading movies...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              🎬 MovieReviewHub
            </Link>

            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="/movies" className="nav-link">
                All Movies
              </Link>

              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home movies={movies} />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
