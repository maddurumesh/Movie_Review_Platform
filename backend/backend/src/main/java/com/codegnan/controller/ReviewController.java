package com.codegnan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codegnan.entity.Movie;
import com.codegnan.entity.Review;
import com.codegnan.entity.Users;
import com.codegnan.repository.MovieRepository;
import com.codegnan.repository.ReviewRepository;
import com.codegnan.repository.UserRepository;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@PostMapping("/add/{userId}/{movieId}")
	public Review addReview(@PathVariable Long userId,@PathVariable long movieId,
			@RequestBody Review review) {
		Users user=userRepository.findById(userId)
				.orElseThrow(()->new RuntimeException("User not found"));
		Movie movie =movieRepository.findById(movieId)
				.orElseThrow(()->new RuntimeException("Movie not found"));
		
		review.setUser(user);
		review.setMovie(movie);
		return reviewRepository.save(review);
	}
	
	@GetMapping("/movie/{movieId}")
	public List<Review> getReviewsByMovie(@PathVariable Long movieId){
		Movie movie=movieRepository.findById(movieId)
				.orElseThrow(()->new RuntimeException("Movie Not found"));
		return reviewRepository.findByMovie(movie);
	}
	@GetMapping("/user/{userId}")
	public List<Review> getReviewsByUser(@PathVariable Long userId){
		Users user=userRepository.findById(userId)
				.orElseThrow(()->new RuntimeException("User noy found"));
		return reviewRepository.findByUser(user);
		
	}
	
	@DeleteMapping("/{id}")
	public String deleteReview(@PathVariable Long id) {
		reviewRepository.deleteById(id);
		return "Review deleted succesfully with id="+id;
	}
}
