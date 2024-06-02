package com.example.backend.controller;

import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Response;
import com.example.backend.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/response")
public class ResponsesController {

@Autowired
public ResponseService responseService;


    @GetMapping("/get-all-responses")
    public ResponseEntity<?> getAllResponses()
    {
        List<ResponseDto> allResponses = responseService.getAllResponses();
        return new ResponseEntity<>(allResponses, HttpStatus.OK);
    }
    @PostMapping("/create-response")
    public ResponseEntity<Response> createResponse(@RequestBody ResponseDto responseDto) {
        Response response = responseService.createResponse(responseDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/get-user-response/{userId}")
    public ResponseEntity<ResponseDto> getUserResponse(@PathVariable String userId) {
        ResponseDto responseDto = responseService.getUserResponse(userId);
        return ResponseEntity.ok(responseDto);
    }
}
