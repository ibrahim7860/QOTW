package com.example.backend.service;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;

import java.util.List;

public interface FriendService {
    List<Friend> getFriends(String requester_id);
    List<Friend> getFriendRequests(String receiver_id);
    FriendRequestDto sendFriendRequest(FriendRequestDto friendRequestDto);
    void manageFriendRequest(String requester_id, String receiver_id, String status);
    void removeFriend(String requester_id, String receiver_id);
}
