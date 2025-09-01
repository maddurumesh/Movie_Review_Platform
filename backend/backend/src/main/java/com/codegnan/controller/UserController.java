package com.codegnan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codegnan.entity.Users;
import com.codegnan.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        return userRepository.save(user);
    }
    
    @GetMapping
    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }
    
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        
        user.setUserName(updatedUser.getUserName());
        user.setEmail(updatedUser.getEmail());        // ✅ Fixed: use getEmail()
        user.setPassword(updatedUser.getPassword());  // ✅ Added missing password update
        user.setProfilePicture(updatedUser.getProfilePicture());
        
        return userRepository.save(user);
    }
    
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully with id = " + id;
    }
}