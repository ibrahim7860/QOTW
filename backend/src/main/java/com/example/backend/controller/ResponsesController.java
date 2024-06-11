package com.example.backend.controller;

import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Chat;
import com.example.backend.entity.Response;
import com.example.backend.service.ChatService;
import com.example.backend.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/response")
public class ResponsesController {

    @Autowired
    public ResponseService responseService;
    
    @Autowired
    public ChatService chatService;

    @GetMapping("/get-friend-responses")
    public ResponseEntity<?> getFriendResponses(@RequestParam String userId) {
        Map<Long, ResponseDto> allResponses = responseService.getAllResponses(userId);
        return new ResponseEntity<>(allResponses, HttpStatus.OK);
    }

    @PostMapping("/create-response")
    public ResponseEntity<Response> createResponse(@RequestBody ResponseDto responseDto) {
        Response response = responseService.createResponse(responseDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping("/{responder_id}/get-reactions")
    public ResponseEntity<?> getReactions(@PathVariable String responder_id) {
        
        List<Chat> chatsForResponse = chatService.getChatsForUser(responder_id);
        return new ResponseEntity<>(chatsForResponse, HttpStatus.OK);
        
    }
}
