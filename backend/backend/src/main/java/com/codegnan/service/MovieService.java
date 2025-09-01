package com.codegnan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codegnan.entity.Movie;
import com.codegnan.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    // ➕ Add movie
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // ➕ Get all movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // ➕ Get movie by ID
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    // ➕ Get movie by Title
    public Optional<Movie> getMovieByTitle(String title) {
        return Optional.ofNullable(movieRepository.findByTitle(title));
    }

    // 🔄 Update movie (PUT)
    public Optional<Movie> updateMovie(Long id, Movie updatedMovie) {
        return movieRepository.findById(id).map(movie -> {
            movie.setTitle(updatedMovie.getTitle());
            movie.setGenre(updatedMovie.getGenre());
            movie.setSynopsis(updatedMovie.getSynopsis());
            movie.setPosterUrl(updatedMovie.getPosterUrl());
            movie.setReleaseYear(updatedMovie.getReleaseYear());
            movie.setDirectorName(updatedMovie.getDirectorName());
            movie.setRating(updatedMovie.getRating());
            movie.setCast(updatedMovie.getCast());
            return movieRepository.save(movie);
        });
    }

    // ❌ Delete movie
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
