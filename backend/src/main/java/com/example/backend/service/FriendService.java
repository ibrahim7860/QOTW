package com.example.backend.service;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;

import java.util.List;
import java.util.Map;

public interface FriendService {
    List<Friend> getFriends(String requester_id);

    Map<String, List<Friend>> getFriendRequests(String receiver_id);

    void sendFriendRequest(FriendRequestDto friendRequestDto);


    void acceptFriendRequest(Long friendship_id);

    void removeFriend(Long friendship_id);
}
