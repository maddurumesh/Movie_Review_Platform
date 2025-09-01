import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
        setLoading(false);

        // Fallback dummy data if backend is not available
        setMovies([
          { id: 1, title: "Inception", releaseYear: 2010, rating: 8.8 },
          { id: 2, title: "The Dark Knight", releaseYear: 2008, rating: 9.0 },
        ]);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "20px" }}>⏳ Loading all movies...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>❌ Error loading movies</h2>
        <p>{error}</p>
        <p>Showing fallback data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>🎬 All Movies</h1>
        <Link
          to="/"
          style={{
            color: "#007bff",
            textDecoration: "none",
            padding: "10px 15px",
            border: "1px solid #007bff",
            borderRadius: "5px"
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {movies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h3>No movies found in the database</h3>
          <p>Add some movies to get started!</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <Link
                to={`/movies/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px"
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "15px",
                      color: "#666"
                    }}
                  >
                    No Image
                  </div>
                )}

                <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{movie.title}</h3>

                <div style={{ marginBottom: "10px" }}>
                  <span style={{ color: "#666" }}>{movie.releaseYear}</span>
                  {movie.genre && (
                    <span style={{ marginLeft: "10px", color: "#888" }}>• {movie.genre}</span>
                  )}
                </div>

                {movie.rating && (
                  <div style={{
                    backgroundColor: "#ff9900",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    display: "inline-block",
                    fontWeight: "bold"
                  }}>
                    ⭐ {movie.rating}
                  </div>
                )}

                {movie.directorName && (
                  <p style={{ margin: "10px 0 0 0", color: "#666", fontSize: "0.9em" }}>
                    Director: {movie.directorName}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <p style={{ color: "#666" }}>
          Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

export default Movies;
