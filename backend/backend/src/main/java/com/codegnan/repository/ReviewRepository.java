package com.codegnan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codegnan.entity.Movie;
import com.codegnan.entity.Review;
import com.codegnan.entity.Users;

public interface ReviewRepository extends JpaRepository<Review,Long>{
List<Review> findByMovie(Movie movie);
List<Review> findByUser(Users user);

}
