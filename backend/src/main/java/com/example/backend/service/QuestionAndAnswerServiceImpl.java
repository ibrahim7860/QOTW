package com.example.backend.service;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entity.Question;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionAndAnswerServiceImpl implements QuestionAndAnswerService {

    @Autowired
    private QuestionRepository questionRepository;

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
}
