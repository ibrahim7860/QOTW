package com.example.backend.repository;

import com.example.backend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query("SELECT f FROM Friend f WHERE f.user_1_id = :user_1_id AND f.status = :status")
    List<Friend> findByUser1IdAndStatus(String user_1_id, String status);

    @Query("SELECT f FROM Friend f WHERE f.user_2_id = :user_2_id AND f.status = :status")
    List<Friend> findByUser2IdAndStatus(String user_2_id, String status);

    @Query("SELECT f FROM Friend f WHERE f.user_1_id = :user_1_id AND f.user_2_id = :user_2_id")
    Friend findByUser1IdAndUser2Id(String user_1_id, String user_2_id);
    
    @Query("SELECT f FROM Friend f WHERE f.friendship_id = :friendship_id")
    Friend findByFriendship_id(Long friendship_id);


}
