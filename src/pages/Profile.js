import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reviews");

  // In a real app, you'd get user ID from authentication context
  const userId = 1; // Replace with actual user ID from auth

  useEffect(() => {
    // Fetch user data
    fetch(`http://localhost:8080/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((userData) => {
        setUser(userData);

        // Fetch user reviews
        return fetch(`http://localhost:8080/users/${userId}/reviews`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((reviewsData) => {
        setReviews(reviewsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        setLoading(false);

        // Fallback dummy data
        setUser({
          id: 1,
          userName: "JohnDoe",
          email: "john@example.com",
          joinDate: "2024-01-15",
          profilePicture: "https://via.placeholder.com/150"
        });

        setReviews([
          {
            id: 1,
            movieTitle: "Inception",
            rating: 5,
            comment: "Amazing movie!",
            createdAt: "2024-03-10"
          },
          {
            id: 2,
            movieTitle: "The Dark Knight",
            rating: 4,
            comment: "Great performance by Heath Ledger",
            createdAt: "2024-02-15"
          }
        ]);

        setWatchlist([
          { id: 1, title: "Interstellar", posterUrl: "https://via.placeholder.com/100x150" },
          { id: 2, title: "Pulp Fiction", posterUrl: "https://via.placeholder.com/100x150" }
        ]);
      });
  }, [userId]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>⏳ Loading profile...</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header with Back Navigation */}
      <div style={{ marginBottom: "30px" }}>
        <Link
          to="/"
          style={{
            color: "#007bff",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "20px"
          }}
        >
          ← Back to Home
        </Link>
        <h1>👤 User Profile</h1>
      </div>

      {/* User Info Card */}
      {user && (
        <div style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "25px"
        }}>
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
          <div>
            <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>{user.userName}</h2>
            <p style={{ margin: "5px 0", color: "#666" }}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              <strong>Member since:</strong> {new Date(user.joinDate).toLocaleDateString()}
            </p>
            <div style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
              <span style={{ backgroundColor: "#e3f2fd", padding: "5px 10px", borderRadius: "15px", color: "#1976d2" }}>
                {reviews.length} Reviews
              </span>
              <span style={{ backgroundColor: "#f3e5f5", padding: "5px 10px", borderRadius: "15px", color: "#7b1fa2" }}>
                {watchlist.length} Watchlist
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #eee" }}>
        <button
          onClick={() => setActiveTab("reviews")}
          style={{
            padding: "12px 24px",
            backgroundColor: activeTab === "reviews" ? "#007bff" : "transparent",
            color: activeTab === "reviews" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "reviews" ? "2px solid #007bff" : "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          My Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab("watchlist")}
          style={{
            padding: "12px 24px",
            backgroundColor: activeTab === "watchlist" ? "#007bff" : "transparent",
            color: activeTab === "watchlist" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "watchlist" ? "2px solid #007bff" : "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Watchlist ({watchlist.length})
        </button>
      </div>

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div>
          <h3>My Reviews</h3>
          {reviews.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>You haven't written any reviews yet.</p>
              <Link
                to="/movies"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Browse movies to write your first review →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {reviews.map((review) => (
                <div key={review.id} style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h4 style={{ margin: "0", color: "#333" }}>{review.movieTitle}</h4>
                    <div style={{
                      backgroundColor: "#ff9900",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontWeight: "bold"
                    }}>
                      ⭐ {review.rating}/5
                    </div>
                  </div>
                  <p style={{ margin: "10px 0", color: "#555", lineHeight: "1.5" }}>
                    {review.comment}
                  </p>
                  <p style={{ margin: "0", color: "#888", fontSize: "0.9em" }}>
                    Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Watchlist Tab */}
      {activeTab === "watchlist" && (
        <div>
          <h3>My Watchlist</h3>
          {watchlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Your watchlist is empty.</p>
              <Link
                to="/movies"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Browse movies to add to your watchlist →
              </Link>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "15px"
            }}>
              {watchlist.map((movie) => (
                <div key={movie.id} style={{ textAlign: "center" }}>
                  <img
                    src={movie.posterUrl || "https://via.placeholder.com/100x150"}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "8px"
                    }}
                  />
                  <p style={{ margin: "0", fontSize: "0.9em", color: "#333" }}>
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
