package com.example.backend.repository;

import com.example.backend.entity.Profile;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Optional<Profile> findByName(String fileName);
    Optional<Profile> findByUser(User user);
}
