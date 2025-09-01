package com.codegnan.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="watch_list")
public class WatchList {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private long id;

@ManyToOne
@JoinColumn(name="user_id",nullable=false)
private Users user;

@ManyToOne
@JoinColumn(name="movie_id",nullable=false)
private Movie movie;

private LocalDateTime dateAdded;

@PrePersist
protected void onCreate() {
	this.dateAdded=LocalDateTime.now();
}


public WatchList() {
	super();
	// TODO Auto-generated constructor stub
}
public WatchList(Users user, Movie movie) {
	super();
	this.user=user;
	this.movie = movie;
	}

@Override
public String toString() {
    return "WatchList [id=" + id +
           ", user=" + (user != null ? user.getUserName() : "null") +
           ", movie=" + (movie != null ? movie.getTitle() : "null") +
           ", dateAdded=" + dateAdded + "]";
}


public long getId() {
	return id;
}
public void setId(long id) {
	this.id = id;
}

public Users getUser() {
	return user;
}


public void setUser(Users user) {
	this.user = user;
}


public Movie getMovie() {
	return movie;
}
public void setMovie(Movie movie) {
	this.movie = movie;
}
public LocalDateTime getDateAdded() {
	return dateAdded;
}
public void setDateAdded(LocalDateTime dateAdded) {
	this.dateAdded = dateAdded;
}

}
