package com.example.backend.controller;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;
import com.example.backend.service.FriendService;
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

    //Gets all of current users friends
    @GetMapping("/{user_id}")
    public ResponseEntity<?> getFriends(@PathVariable String user_id) {
        List<Friend> friends = friendService.getFriends(user_id);
        return new ResponseEntity<>(friends, HttpStatus.OK);
    }

    //Gets all friend requests that have been sent TO the current user
    @GetMapping("/requests/{user_id}")
    public ResponseEntity<Map<String, List<Friend>>> getFriendRequests(@PathVariable String user_id) {
        Map<String, List<Friend>> requests = friendService.getFriendRequests(user_id);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PutMapping("/requests/sendFriendRequest")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequestDto friendRequestDto) {
        friendService.sendFriendRequest(friendRequestDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/requests/acceptRequest/{friendship_id}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Long friendship_id) {
        friendService.acceptFriendRequest(friendship_id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{friendship_id}")
    public ResponseEntity<?> removeFriend(@PathVariable Long friendship_id) {
        friendService.removeFriend(friendship_id);
        return new ResponseEntity<>("Friend removed successfully", HttpStatus.OK);
    }

    @DeleteMapping("/requests/delete/{friendship_id}")
    public ResponseEntity<?> rejectFriendRequest(@PathVariable Long friendship_id) {
        friendService.removeFriend(friendship_id);
        return new ResponseEntity<>("Friend request rejected successfully successfully", HttpStatus.OK);
    }

    @DeleteMapping("/requests/cancel/{friendship_id}")
    public ResponseEntity<?> cancelFriendRequest(@PathVariable Long friendship_id) {
        friendService.removeFriend(friendship_id);
        return new ResponseEntity<>("Friend request cancelled successfully", HttpStatus.OK);
    }
}
