package com.example.backend.repository;

import com.example.backend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByRequesterIdAndStatus(String requester_id, String status);
    List<Friend> findByReceiverIdAndStatus(String receiver_id, String status);
    Friend findByRequesterIdAndReceiverId(String requester_id, String receiver_id);
}
