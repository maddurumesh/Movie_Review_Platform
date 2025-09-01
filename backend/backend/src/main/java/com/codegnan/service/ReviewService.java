package com.codegnan.service;

import java.util.List;

import com.codegnan.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codegnan.entity.Movie;
import com.codegnan.entity.Review;

import com.codegnan.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;
	
	public Review addReview(Review review) {
		return reviewRepository.save(review);
	}
	public List<Review> getReviewByMovie(Movie movie){
		return reviewRepository.findByMovie(movie);
	}
	
	public List<Review> getReviewsByUser(Users user){
		return reviewRepository.findByUser(user);
	}
	public void deleteReview(Long id) {
		reviewRepository.deleteById(id);
	}
}
