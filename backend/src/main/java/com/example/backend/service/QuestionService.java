package com.example.backend.service;

import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Response;

public interface QuestionService {
    QuestionDto getQuestion();

    void createQuestion(QuestionDto questionDto);

   
}
