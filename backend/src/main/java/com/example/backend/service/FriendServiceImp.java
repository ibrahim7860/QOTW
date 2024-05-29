package com.example.backend.service;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.FriendRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class FriendServiceImp implements FriendService {
    @Autowired
    private FriendRepository friendRepository;
    @Autowired
    private UserRepository userRepository;


    //Gets all friend requests for a user. A user will either be User 1 or User 2 in the database depending on who initiated the friend request (user 1 or 2)
    public List<Friend> getFriends(String user_id) {
        List<Friend> allFriends = new ArrayList<>();
        List<Friend> friends1 = friendRepository.findByUser1IdAndStatus(user_id, "accepted");
        List<Friend> friends2 = friendRepository.findByUser2IdAndStatus(user_id, "accepted");


        allFriends.addAll(friends1);
        allFriends.addAll(friends2);
        return allFriends;
    }

    public Map<String, List<Friend>> getFriendRequests(String user_id) {
        List<Friend> incomingRequests = friendRepository.findByUser2IdAndStatus(user_id, "pending"); //Incoming requests
        List<Friend> sentRequests = friendRepository.findByUser1IdAndStatus(user_id, "pending"); //Sent requests

        Map<String, List<Friend>> requestsMap = new HashMap<>();
        requestsMap.put("Incoming", incomingRequests);
        requestsMap.put("Sent", sentRequests);

        return requestsMap;

    }

    public void acceptFriendRequest(Long friendship_id) {
        Friend friendToAccept = friendRepository.findByFriendship_id(friendship_id);
        friendToAccept.setStatus("accepted");
        friendRepository.save(friendToAccept);
    }


    @Override
    public void removeFriend(Long friendship_id) {
        friendRepository.deleteById(friendship_id);
    }

    public void sendFriendRequest(FriendRequestDto friendRequestDto) {

        //Check if both users exist
        boolean user_1_present = userRepository.existsById(friendRequestDto.getUser_1_id());
        boolean user_2_present = userRepository.existsById(friendRequestDto.getUser_2_id());


        if (user_1_present && user_2_present) {
            //request1 will not be null in which the current user has already sent a friend request to user 2 already
            Friend request1 = friendRepository.findByUser1IdAndUser2Id(friendRequestDto.getUser_1_id(), friendRequestDto.getUser_2_id());

            //request2 will not be null if the person the current user wants to send a friend request to has already sent the current user a friend request
            Friend request2 = friendRepository.findByUser1IdAndUser2Id(friendRequestDto.getUser_2_id(), friendRequestDto.getUser_1_id());


            //Current user has already sent request to user 2
            if (request1 != null) {
                if (request1.getStatus().equals("accepted")) {
                    throw new CustomAuthenticationException("You are already friends", HttpStatus.CONFLICT);
                } else if (request1.getStatus().equals("pending")) {
                    throw new CustomAuthenticationException(String.format("You have already sent a friend request to: %s", friendRequestDto.getUser_2_id()), HttpStatus.CONFLICT);
                }
            } else if (request2 != null) {
                if (request2.getStatus().equals("accepted")) {
                    throw new CustomAuthenticationException("You are already friends", HttpStatus.CONFLICT);
                } else if (request2.getStatus().equals("pending")) {
                    throw new CustomAuthenticationException("This user has already sent you a request. Please accept, reject, or block on Friend Requests Screen", HttpStatus.CONFLICT);
                }
            } else //Not friends/no friend requests already sent
            {
                Friend friendship = new Friend();
                friendship.setUser_1_id(friendRequestDto.getUser_1_id());
                friendship.setUser_2_id(friendRequestDto.getUser_2_id());
                friendship.setStatus(friendRequestDto.getStatus());

                friendRepository.save(friendship);
            }
        } else {
            if (!user_1_present) {
                throw new CustomAuthenticationException("User 1 not found", HttpStatus.NOT_FOUND);
            } else {
                throw new CustomAuthenticationException("User you are sending friend request to does not exist", HttpStatus.NOT_FOUND);
            }
        }

    }
}
