package com.example.backend.service;

import com.example.backend.dto.FriendRequestDto;
import com.example.backend.entity.Friend;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.FriendRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FriendServiceImp implements FriendService {
    @Autowired
    private FriendRepository friendRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Friend> getFriends(String requester_id) {
        return friendRepository.findByRequesterIdAndStatus(requester_id, "accepted");
    }

    public List<Friend> getFriendRequests(String receiver_id) {
        return friendRepository.findByReceiverIdAndStatus(receiver_id, "pending");
    }

    public void manageFriendRequest(String requester_id, String receiver_id, String status) {
        boolean requesterPresent = userRepository.existsById(requester_id);
        boolean receiverPresent = userRepository.existsById(receiver_id);

        if (requesterPresent && receiverPresent) {
            Friend request = friendRepository.findByRequesterIdAndReceiverId(requester_id, receiver_id);

            if (request.getStatus().equals("pending")) {
                request.setStatus(status);
                friendRepository.save(request);
            } else if (request.getStatus().equals("declined")){
                throw new CustomAuthenticationException("Request was declined", HttpStatus.BAD_REQUEST);
            }else {
                throw new CustomAuthenticationException("Request not in pending", HttpStatus.BAD_REQUEST);
            }
        } else {
            if (!requesterPresent) {
                throw new CustomAuthenticationException("Requester ID not valid", HttpStatus.NOT_FOUND);
            }else {
                throw new CustomAuthenticationException("Receiver ID not valid", HttpStatus.NOT_FOUND);
            }
        }
    }

    @Override
    public void removeFriend(String requester_id, String receiver_id) {
        Friend friendToRemove = friendRepository.findByRequesterIdAndReceiverId(requester_id, receiver_id);

        if (friendToRemove != null) {
            friendRepository.deleteById(friendToRemove.getFrienshipId());
        } else {
            throw new CustomAuthenticationException("The request to remove failed", HttpStatus.NOT_FOUND);
        }
    }

    public FriendRequestDto sendFriendRequest(FriendRequestDto friendRequestDto) {
        boolean requesterPresent = userRepository.existsById(friendRequestDto.getRequester_id());
        boolean receiverPresent = userRepository.existsById(friendRequestDto.getReceiver_id());
        if (requesterPresent && receiverPresent) {
            Friend request = friendRepository.findByRequesterIdAndReceiverId(friendRequestDto.getRequester_id(), friendRequestDto.getReceiver_id());
            if(request != null)
            {
                if(request.getStatus().equals("accepted")) {
                    throw new CustomAuthenticationException("You are already friends", HttpStatus.CONFLICT);
                }else {
                    throw new CustomAuthenticationException("There was already a friend request sent", HttpStatus.CONFLICT);
                }
            }else {
                Friend friendship = new Friend();
                friendship.setFrienshipId(friendRequestDto.getFriendship_id());
                friendship.setRequesterId(friendRequestDto.getRequester_id());
                friendship.setReceiverId(friendRequestDto.getReceiver_id());
                friendship.setStatus(friendRequestDto.getStatus());
                friendship.setDateFriended(LocalDateTime.now());

                friendRepository.save(friendship);
            }
        } else {
            if(!requesterPresent)
            {
                throw new CustomAuthenticationException("Requesting user not found", HttpStatus.NOT_FOUND);
            }else {
                throw new CustomAuthenticationException("Receiving user not found", HttpStatus.NOT_FOUND);
            }
        }

        return friendRequestDto;
    }
}
