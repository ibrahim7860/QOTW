package com.example.backend.service;

import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.ResponseDto;
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

import java.util.Optional;

@Service
public class QuestionAndAnswerServiceImpl implements QuestionAndAnswerService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResponseRepository responseRepository;

    public QuestionDto getQuestionById(Long questionId) {
        Optional<Question> question = questionRepository.findById(questionId);
        if (question.isPresent()) {
            Question q = question.get();
            QuestionDto dto = new QuestionDto();
            dto.setQuestionId(q.getQuestionId());
            dto.setQuestionText(q.getQuestionText());
            dto.setDatePosted(q.getDatePosted());
            return dto;
        } else {
            throw new CustomAuthenticationException("Question not found", HttpStatus.NOT_FOUND);
        }
    }

    public Question addQuestion(QuestionDto questionDto) {
        Question question = new Question();
        question.setQuestionText(questionDto.getQuestionText());
        question.setDatePosted(questionDto.getDatePosted());

        return questionRepository.save(question);
    }

    public Response createResponse(ResponseDto responseDto) {
        User user = userRepository.findById(responseDto.getUserId()).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        Question question = questionRepository.findById(responseDto.getQuestionId()).orElseThrow(
                () -> new CustomAuthenticationException("Question not found", HttpStatus.NOT_FOUND));

        Response response = new Response();
        response.setUser(user);
        response.setQuestion(question);
        response.setResponseText(responseDto.getResponseText());
        response.setDateResponded(responseDto.getDateResponded());

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
            responseDto.setDateResponded(r.getDateResponded());
            return responseDto;
        } else {
            return null;
        }
    }
}
