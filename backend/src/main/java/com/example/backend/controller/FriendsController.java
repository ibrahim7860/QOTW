package com.example.backend.controller;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;
import com.example.backend.repository.FriendRepository;
import com.example.backend.service.FriendService;
import com.example.backend.service.FriendServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class FriendsController {
    @Autowired
    private FriendService friendService;

    @GetMapping("/{requester_id}")
    public ResponseEntity<?> getFriends(@PathVariable String requester_id) {
        List<Friend> friends = friendService.getFriends(requester_id);
        return new ResponseEntity<>(Map.of("friends:", friends), HttpStatus.CREATED);
    }

    @GetMapping("/requests/{receiver_id}")
    public ResponseEntity<?> getFriendRequests(@PathVariable String receiver_id) {
        List<Friend> requests = friendService.getFriendRequests(receiver_id);
        return new ResponseEntity<>(Map.of("requests", requests), HttpStatus.CREATED);
    }

    @PostMapping("/addFriend")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequestDto friendRequestDto) {
        FriendRequestDto request = friendService.sendFriendRequest(friendRequestDto);
        return new ResponseEntity<>(Map.of("request", request), HttpStatus.CREATED);
    }

    @PutMapping("/requests/acceptRequest/{requester_id}/{receiver_id}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable String requester_id, @PathVariable String receiver_id) {
        friendService.acceptFriendRequest(requester_id, receiver_id);
        return new ResponseEntity<>("Friend request accepted", HttpStatus.CREATED);
    }
}
