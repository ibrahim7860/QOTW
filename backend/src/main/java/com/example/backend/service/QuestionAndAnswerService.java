package com.example.backend.service;

import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Question;
import com.example.backend.entity.Response;

public interface QuestionAndAnswerService {
    QuestionDto getQuestionById(Long questionId);
    Question addQuestion(QuestionDto questionDto);
    Response createResponse(ResponseDto responseDto);
    ResponseDto getUserResponse(String userId);
}
