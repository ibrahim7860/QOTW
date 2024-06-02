package com.example.backend.repository;

import com.example.backend.entity.Response;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {
    Optional<Response> findByUser(User user);

    @Query(value = "SELECT r.response_id, r.response_text, r.question_id, r.user_id, u.first_name, u.last_name FROM responses r JOIN users u ON r.user_id = u.user_id", nativeQuery = true)
    List<Object[]> getAllResponses();

}
