import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "20px" }}>⏳ Loading movie details...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>❌ Error loading movie</h2>
        <p>{error}</p>
        <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>🎬 Movie not found</h2>
        <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#007bff", textDecoration: "none", marginBottom: "20px", display: "block" }}>
        ← Back to Home
      </Link>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Movie Poster */}
        <div style={{ flex: "0 0 300px" }}>
          <img
            src={movie.posterUrl || "https://via.placeholder.com/300x450"}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
          />
        </div>

        {/* Movie Details */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{movie.title}</h1>

          <div style={{ marginBottom: "15px" }}>
            <span style={{ fontSize: "1.2em", fontWeight: "bold", color: "#ff9900" }}>
              ⭐ {movie.rating || "N/A"}
            </span>
            <span style={{ marginLeft: "15px", color: "#666" }}>{movie.releaseYear}</span>
          </div>

          {movie.genre && (
            <p style={{ margin: "5px 0" }}>
              <strong>Genre:</strong> {movie.genre}
            </p>
          )}

          {movie.directorName && (
            <p style={{ margin: "5px 0" }}>
              <strong>Director:</strong> {movie.directorName}
            </p>
          )}

          {movie.cast && (
            <p style={{ margin: "5px 0" }}>
              <strong>Cast:</strong> {movie.cast}
            </p>
          )}

          {movie.synopsis && (
            <div style={{ margin: "20px 0" }}>
              <h3>Synopsis</h3>
              <p style={{ lineHeight: "1.6", color: "#555" }}>{movie.synopsis}</p>
            </div>
          )}

          {/* Reviews Section */}
          <div style={{ marginTop: "30px" }}>
            <h3>Reviews</h3>
            <p style={{ color: "#666", fontStyle: "italic" }}>
              Reviews functionality coming soon...
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add Review
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Edit Movie
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
