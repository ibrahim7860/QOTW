package com.example.backend.service;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entity.Question;

public interface QuestionAndAnswerService {
    QuestionDto getQuestionById(Long questionId);
    Question addQuestion(QuestionDto questionDto);
}
