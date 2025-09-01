package com.codegnan.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class Users {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;

@Column(name="user_name",nullable=false,unique=true,length=50)
private String userName;

@Column(nullable=false,unique=true,length=40)
private String email;

@Column(nullable=false)
private String password;

@Column(name="profile_picture")
private String profilePicture;

@Column(name="join_date")
private LocalDate joinDate;

@PrePersist
protected void onCreate() {
	this.joinDate=LocalDate.now();
}
public Users() {
	super();
	// TODO Auto-generated constructor stub
}
public Users(Long id, String userName, String email, String password, String profilePicture, LocalDate joinDate) {
	super();
	this.id = id;
	this.userName = userName;
	this.email = email;
	this.password = password;
	this.profilePicture = profilePicture;
	this.joinDate = joinDate;
}
@Override
public String toString() {
	return "Users [id=" + id + ", userName=" + userName + ", email=" + email + ", password=" + password
			+ ", profilePicture=" + profilePicture + ", joinDate=" + joinDate + "]";
}
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getUserName() {
	return userName;
}
public void setUserName(String userName) {
	this.userName = userName;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getProfilePicture() {
	return profilePicture;
}
public void setProfilePicture(String profilePicture) {
	this.profilePicture = profilePicture;
}
public LocalDate getJoinDate() {
	return joinDate;
}
public void setJoinDate(LocalDate joinDate) {
	this.joinDate = joinDate;
}

}
