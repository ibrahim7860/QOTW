package com.example.backend.repository;

import com.example.backend.entity.BlacklistedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long> {
    @Query("SELECT COUNT(b) > 0 FROM BlacklistedToken b WHERE b.token = ?1 AND b.expiryDate > ?2")
    boolean existsByTokenAndNotExpired(String token, LocalDateTime localDateTime);
}

