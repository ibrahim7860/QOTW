package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);

    User findFirstByUserId(String userId);

    User findByEmail(String email);

    @Query(value = "SELECT user_id FROM users WHERE email_verified = true", nativeQuery = true)
    List<String> getAllUserIDs();

}

