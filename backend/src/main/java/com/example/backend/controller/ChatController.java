package com.example.backend.controller;

import com.example.backend.dto.ChatInitiationRequest;
import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import com.example.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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
    public ResponseEntity<?> sendMessage(@RequestBody MessageDto messageDto) {
        try {
            Message message = chatService.sendMessage(messageDto.getChatId(), messageDto.getSenderId(), messageDto.getContent());
            chatService.sendMessage(messageDto.getChatId(), message);
            return ResponseEntity.ok().body("Message sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message: " + e.getMessage());
        }
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

    @DeleteMapping("/{chatId}")
    public ResponseEntity<?> deleteChat(@PathVariable Long chatId) {
        try {
            chatService.deleteChat(chatId);
            return ResponseEntity.ok().body("Chat and all associated messages deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete chat: " + e.getMessage());
        }
    }

    @GetMapping("/stream/{chatId}")
    public SseEmitter stream(@PathVariable Long chatId) {
        SseEmitter emitter = new SseEmitter();
        chatService.addEmitter(chatId, emitter);
        emitter.onCompletion(() -> chatService.removeEmitter(chatId, emitter));
        emitter.onTimeout(() -> chatService.removeEmitter(chatId, emitter));
        return emitter;
    }
}