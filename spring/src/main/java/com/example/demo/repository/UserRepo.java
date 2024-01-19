package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "select u.* from [user] u where u.loginname=:loginname" , nativeQuery = true)
    Optional<User> findUserByLoginname(@Param("loginname") String loginname);
}
