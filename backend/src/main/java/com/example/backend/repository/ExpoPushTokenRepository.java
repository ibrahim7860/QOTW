package com.example.backend.repository;

import com.example.backend.entity.ExpoPushToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpoPushTokenRepository extends JpaRepository<ExpoPushToken, Long> {
    ExpoPushToken findByUserId(String userId);
}
