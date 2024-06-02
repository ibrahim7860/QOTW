package com.example.backend.controller;

import com.example.backend.dto.QuestionDto;
import com.example.backend.entity.Question;
import com.example.backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/create-question")
    public ResponseEntity<Question> addQuestion(@RequestBody @Valid QuestionDto questionDto) {
        questionService.createQuestion(questionDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/get-question")
    public ResponseEntity<QuestionDto> getQuestionById() {
        QuestionDto question = questionService.getQuestion();
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
