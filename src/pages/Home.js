import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🚀 Home component is rendering!");

  // Fetch movies from Spring Boot backend
  useEffect(() => {
    console.log("🔁 useEffect started - fetching from: http://localhost:8080/movies");

    fetch("http://localhost:8080/movies")
      .then((res) => {
        console.log("📨 Response status:", res.status, res.statusText);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Data received from backend:", data);
        setMovies(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError(err.message);

        // fallback dummy movies if backend is not running
        setMovies([
          {
            id: 1,
            title: "Inception",
            posterUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
            rating: 8.8,
            releaseYear: 2010,
            genre: "Sci-Fi",
            directorName: "Christopher Nolan"
          },
          {
            id: 2,
            title: "Interstellar",
            posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            rating: 8.6,
            releaseYear: 2014,
            genre: "Sci-Fi",
            directorName: "Christopher Nolan"
          },
          {
            id: 3,
            title: "The Dark Knight",
            posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            rating: 9.0,
            releaseYear: 2008,
            genre: "Action",
            directorName: "Christopher Nolan"
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>⏳ Loading movies...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movie Review Platform</h1>
      <h2>Featured Movies</h2>

      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: "#ffebee",
          color: "#d32f2f",
          padding: "15px",
          borderRadius: "8px",
          margin: "20px 0",
          border: "1px solid #d32f2f"
        }}>
          <strong>⚠️ Connection Error:</strong> {error}
          <br />
          <small>Showing fallback data. Backend might be unavailable.</small>
        </div>
      )}

      {/* Success Message */}
      {!error && movies.length > 0 && (
        <div style={{
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          padding: "10px",
          borderRadius: "8px",
          margin: "10px 0",
          textAlign: "center"
        }}>
          ✅ Connected to backend! Showing {movies.length} movies
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "12px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "black" }}>
              <img
                src={movie.posterUrl || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4="}
                alt={movie.title}
                width="200"
                height="300"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "10px"
                }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
                }}
              />
              <h3 style={{ margin: "10px 0", color: "#333" }}>{movie.title}</h3>
              <p style={{ margin: "5px 0", color: "#666" }}>({movie.releaseYear})</p>
              {movie.genre && (
                <p style={{ margin: "5px 0", color: "#888", fontSize: "0.9em" }}>
                  {movie.genre}
                </p>
              )}
            </Link>
            <p style={{
              margin: "10px 0 0 0",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ff9800"
            }}>
              ⭐ {movie.rating}
            </p>
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        fontSize: "0.9em",
        color: "#666"
      }}>
        <strong>Debug Info:</strong><br />
        • Frontend: http://localhost:3000<br />
        • Backend: http://localhost:8080/movies<br />
        • Movies loaded: {movies.length}<br />
        • Connection: {error ? "❌ Failed" : "✅ Successful"}
      </div>
    </div>
  );
};

export default Home;
