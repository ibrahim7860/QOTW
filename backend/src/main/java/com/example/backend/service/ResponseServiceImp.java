package com.example.backend.service;

import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Friend;
import com.example.backend.entity.Question;
import com.example.backend.entity.Response;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ResponseRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ResponseServiceImp implements ResponseService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private FriendService friendService;


    public Response createResponse(ResponseDto responseDto) {
        User user = userRepository.findById(responseDto.getUserId()).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        Question question = questionRepository.findById(responseDto.getQuestionId()).orElseThrow(
                () -> new CustomAuthenticationException("Question not found", HttpStatus.NOT_FOUND));

        Response response = new Response();
        response.setUser(user);
        response.setQuestion(question);
        response.setResponseText(responseDto.getResponseText());


        return responseRepository.save(response);
    }

    public ResponseDto getUserResponse(String userId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        Optional<Response> response = responseRepository.findByUser(user);
        if (response.isPresent()) {
            Response r = response.get();
            ResponseDto responseDto = new ResponseDto();
            responseDto.setResponseId(r.getResponseId());
            responseDto.setUserId(r.getUser().getUserId());
            responseDto.setQuestionId(r.getQuestion().getQuestionId());
            responseDto.setResponseText(r.getResponseText());
            return responseDto;
        } else {
            return null;
        }
    }

    public Map<Long, ResponseDto> getAllResponses(String userId) {
        List<Friend> friends = friendService.getFriends(userId);
        Set<String> friendIds = friends.stream()
                .flatMap(friend -> Stream.of(friend.getUser_1_id(), friend.getUser_2_id()))
                .filter(id -> !id.equals(userId))  // Exclude the requesting user's own ID
                .collect(Collectors.toSet());

        Map<Long, ResponseDto> responsesMap = new HashMap<>();

        ResponseDto userResponse = getUserResponse(userId); // Check if the user has any responses

        if (friendIds.isEmpty() && userResponse == null) {
            // No friends and no user response, return empty map
            return responsesMap;
        }

        List<Object[]> allResponses = responseRepository.getAllResponses(); // Get all responses
        responsesMap = allResponses.stream()
                .filter(objects -> friendIds.contains((String) objects[3])) // Filter by friend IDs
                .map(objects -> new ResponseDto(
                        (Long) objects[0],    // responseId
                        (String) objects[3],  // userId
                        (Long) objects[2],    // questionId
                        (String) objects[1],   // responseText
                        (String) objects[4], // firstName
                        (String) objects[5] // lastName
                ))
                .collect(Collectors.toMap(
                        ResponseDto::getResponseId, // Key mapper
                        responseDto -> responseDto  // Value mapper
                ));

        // If user's own response exists, add it to the map
        if (userResponse != null) {
            responsesMap.put(userResponse.getResponseId(), userResponse);
        }

        return responsesMap;
    }

}
