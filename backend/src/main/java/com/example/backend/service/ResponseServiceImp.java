package com.example.backend.service;

import com.example.backend.dto.ResponseDto;
import com.example.backend.dto.UserDetailsDto;
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

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResponseServiceImp implements ResponseService{

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResponseRepository responseRepository;


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
            responseDto.setUserId(r.getUser().getUserId());
            responseDto.setQuestionId(r.getQuestion().getQuestionId());
            responseDto.setResponseText(r.getResponseText());
            return responseDto;
        } else {
            return null;
        }
    }

    public List<ResponseDto> getAllResponses() {
        
       List<Object[]> allResponses = responseRepository.getAllResponses();
        return allResponses.stream()
                .map(objects -> new ResponseDto(
                        (Long) objects[0],
                        (String) objects[1],  // user_id
                        (Long) objects[2],  // questionId
                        (String) objects[3]  // response_text
                ))
                .collect(Collectors.toList());
    }
    
}
