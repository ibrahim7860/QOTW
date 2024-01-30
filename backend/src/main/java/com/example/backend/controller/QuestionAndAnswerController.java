package com.example.backend.controller;

import com.example.backend.dto.QuestionDto;
import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Question;
import com.example.backend.entity.Response;
import com.example.backend.service.QuestionAndAnswerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class QuestionAndAnswerController {

    @Autowired
    private QuestionAndAnswerService questionAndAnswerService;

    @PostMapping("/create-question")
    public ResponseEntity<Question> addQuestion(@RequestBody @Valid QuestionDto questionDto) {
        Question newQuestion = questionAndAnswerService.addQuestion(questionDto);
        return new ResponseEntity<>(newQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long id) {
        QuestionDto question = questionAndAnswerService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/response")
    public ResponseEntity<Response> createResponse(@RequestBody ResponseDto responseDto) {
        Response response = questionAndAnswerService.createResponse(responseDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/response")
    public ResponseEntity<ResponseDto> getUserResponse(@PathVariable String userId) {
        ResponseDto responseDto = questionAndAnswerService.getUserResponse(userId);
        return ResponseEntity.ok(responseDto);
    }

}
