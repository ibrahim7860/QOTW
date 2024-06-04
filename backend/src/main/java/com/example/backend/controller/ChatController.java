package com.example.backend.controller;

import com.example.backend.dto.ChatInitiationRequest;
import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import com.example.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/start")
    public Chat startChatWithMessage(@RequestBody ChatInitiationRequest request) {
        return chatService.startChatWithMessage(request.getInitiatorId(), request.getResponderId(), request.getSenderId(), request.getMessageContent());
    }

    @GetMapping("/{chatId}")
    public Chat getChat(@PathVariable Long chatId) {
        return chatService.getChat(chatId);
    }

    @GetMapping("/user/{userId}")
    public List<Chat> getUserChats(@PathVariable String userId) {
        return chatService.getChatsForUser(userId);
    }

    @PostMapping("/message/send")
    public Message sendMessage(@RequestBody MessageDto message) {
        return chatService.sendMessage(message.getChatId(), message.getSenderId(), message.getContent());
    }

    @GetMapping("/checkConversation/{currentUser}/{otherUserId}")
    public ResponseEntity<?> checkConversation(@PathVariable String currentUser, @PathVariable String otherUserId) {
        Chat chat = chatService.checkForExistingChat(currentUser, otherUserId);
        if (chat != null) {
            return ResponseEntity.ok(chat);
        } else {
            return ResponseEntity.noContent().build();  // No conversation exists
        }
    }
}