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
public class QuestionServiceImp implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;


    public QuestionDto getQuestion() {
        Optional<Question> question = questionRepository.getQuestion();
        if (question.isPresent()) {
            Question q = question.get();
            QuestionDto dto = new QuestionDto();
            dto.setQuestionId(q.getQuestionId());
            dto.setQuestionText(q.getQuestionText());
            
            return dto;
        } else {
            throw new CustomAuthenticationException("Question not found", HttpStatus.NOT_FOUND);
        }
    }

    public void createQuestion(QuestionDto questionDto) {
        Question question = new Question();
        question.setQuestionText(questionDto.getQuestionText());

        questionRepository.save(question);
    }
    
}
