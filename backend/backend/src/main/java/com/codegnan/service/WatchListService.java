package com.codegnan.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codegnan.entity.Users;
import com.codegnan.entity.WatchList;
import com.codegnan.repository.WatchListRepository;

@Service
public class WatchListService {

	@Autowired
	private WatchListRepository watchListRepository;
	
	public WatchList addToWatchList(WatchList watchList) {
		return watchListRepository.save(watchList);
	}
	
	public List<WatchList> getWatchListByUser(Users user){
		return watchListRepository.findByUser(user);
	}
	public void removeFromWatchList(Long id) {
		watchListRepository.deleteById(id);
	}
}
