package com.codegnan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codegnan.entity.Users;
import com.codegnan.entity.WatchList;
import com.codegnan.exception.UserNotFoundException;
import com.codegnan.repository.UserRepository;
import com.codegnan.service.WatchListService;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/add")
    public ResponseEntity<WatchList> addToWatchList(@RequestBody WatchList watchList) {
        WatchList savedWatchList = watchListService.addToWatchList(watchList);
        return ResponseEntity.ok(savedWatchList);
    }
    
    @GetMapping("/user/{userId}") // Fixed the path variable syntax
    public ResponseEntity<List<WatchList>> getWatchListByUser(@PathVariable Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        List<WatchList> watchList = watchListService.getWatchListByUser(user);
        return ResponseEntity.ok(watchList);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFromWatchList(@PathVariable Long id) {
        watchListService.removeFromWatchList(id);
        return ResponseEntity.ok("Removed from watchlist with id: " + id);
    }
}