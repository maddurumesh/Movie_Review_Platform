package com.codegnan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codegnan.entity.Users;
import com.codegnan.entity.WatchList;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {
List<WatchList> findByUser(Users user);
}
