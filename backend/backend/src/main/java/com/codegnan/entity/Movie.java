package com.codegnan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    private String genre;
    private String synopsis;
    
    @Column(name = "poster_url")
    private String posterUrl;
    
    @Column(name = "release_year")
    private Integer releaseYear;
    
    @Column(name = "director_name")
    private String directorName;
    
    private String cast;
    private Double rating = 0.0;
    
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Added to prevent LazyInitializationException
    private List<Review> reviews = new ArrayList<>();
    
    // Constructors
    public Movie() {}
    
    public Movie(String title, String genre, String synopsis, String posterUrl, 
                Integer releaseYear, String directorName, String cast) {
        this.title = title;
        this.genre = genre;
        this.synopsis = synopsis;
        this.posterUrl = posterUrl;
        this.releaseYear = releaseYear;
        this.directorName = directorName;
        this.cast = cast;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    
    public String getSynopsis() { return synopsis; }
    public void setSynopsis(String synopsis) { this.synopsis = synopsis; }
    
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    
    public Integer getReleaseYear() { return releaseYear; }
    public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }
    
    public String getDirectorName() { return directorName; }
    public void setDirectorName(String directorName) { this.directorName = directorName; }
    
    public String getCast() { return cast; }
    public void setCast(String cast) { this.cast = cast; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
    
    // Calculate average rating
    public Double calculateAverageRating() {
        if (reviews == null || reviews.isEmpty()) {
            return 0.0;
        }
        
        double sum = 0.0;
        for (Review review : reviews) {
            sum += review.getRating();
        }
        return sum / reviews.size();
    }
    
    // Helper method to add review
    public void addReview(Review review) {
        reviews.add(review);
        review.setMovie(this);
        this.rating = calculateAverageRating();
    }
}