package com.example.backend.repository;

import com.example.backend.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findByParticipant1IdAndParticipant2Id(String participant1Id, String participant2Id);

    List<Chat> findByParticipant1IdOrParticipant2Id(String participant1Id, String participant2Id);
}



