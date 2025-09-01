package com.codegnan.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codegnan.entity.Movie;
import com.codegnan.entity.Review;
import com.codegnan.entity.Users;
import com.codegnan.repository.MovieRepository;
import com.codegnan.repository.UserRepository;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    // === Get All Movies ===
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return ResponseEntity.ok(movies);
    }

    // === Get Movie by ID ===
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id " + id));
        return ResponseEntity.ok(movie);
    }

    // === Add New Movie ===
    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        // Set default rating if null
        if (movie.getRating() == null) {
            movie.setRating(0.0);
        }
        
        // Handle reviews if provided
        if (movie.getReviews() != null && !movie.getReviews().isEmpty()) {
            for (Review review : movie.getReviews()) {
                if (review.getUser() != null && review.getUser().getId() != null) {
                    Users existingUser = userRepository.findById(review.getUser().getId())
                            .orElseThrow(() -> new RuntimeException("User not found with id " + review.getUser().getId()));
                    review.setUser(existingUser);
                }
                review.setMovie(movie);
            }
        }
        
        Movie savedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(savedMovie);
    }

    // === Update Existing Movie ===
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id " + id));

        // Update basic fields
        movie.setTitle(updatedMovie.getTitle());
        movie.setGenre(updatedMovie.getGenre());
        movie.setSynopsis(updatedMovie.getSynopsis());
        movie.setPosterUrl(updatedMovie.getPosterUrl());
        movie.setReleaseYear(updatedMovie.getReleaseYear());
        movie.setDirectorName(updatedMovie.getDirectorName());
        movie.setCast(updatedMovie.getCast());
        movie.setRating(updatedMovie.getRating() != null ? updatedMovie.getRating() : 0.0);

        Movie savedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(savedMovie);
    }

    // === Delete Movie ===
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
        return ResponseEntity.ok("Movie deleted successfully with id " + id);
    }
}