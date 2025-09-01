package com.codegnan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codegnan.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie ,Long>{
Movie findByTitle(String title);
}
