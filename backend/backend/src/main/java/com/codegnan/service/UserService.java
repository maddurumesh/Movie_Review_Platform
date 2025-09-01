package com.codegnan.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.codegnan.entity.Users;
import com.codegnan.repository.UserRepository;

@Service
public class UserService {
@Autowired
private UserRepository userRepository;
 public Users registerUser(Users user) {
	 return userRepository.save(user);
 }
	public List<Users> getAllUsers(){
		return userRepository.findAll();
	}
	public Optional<Users> getUserById(Long id){
		return userRepository.findById(id);
	}
	public Users updateUser(Long id,Users updatedUser) {
		return userRepository.findById(id).map(user->{
			user.setUserName(updatedUser.getUserName());
			user.setEmail(updatedUser.getEmail());
			user.setPassword(updatedUser.getPassword());
			user.setProfilePicture(updatedUser.getProfilePicture());
			return userRepository.save(user);
			
		}).orElse(null);
		
		
	}
	public void deleteUser(Long id) {
		userRepository.deleteById(id);;
	}
}
