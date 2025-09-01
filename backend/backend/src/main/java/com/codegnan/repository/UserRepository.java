package com.codegnan.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.codegnan.entity.Users;

public interface UserRepository extends JpaRepository<Users,Long>{
 Users findByUserName(String userName);
 Users findByEmail(String email);
}
