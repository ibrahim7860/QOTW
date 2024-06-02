package com.example.backend.repository;

import com.example.backend.entity.Response;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {
    Optional<Response> findByUser(User user);

    @Query(value = "SELECT * FROM responses", nativeQuery = true)
    List<Object[]> getAllResponses();
}
