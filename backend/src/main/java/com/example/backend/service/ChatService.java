package com.example.backend.service;

import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface ChatService {
    Chat startChatWithMessage(String initiatorId, String responderId, String senderId, String messageContent);

    Message sendMessage(Long chatId, String senderId, String content);

    List<Message> getMessages(Long chatId);

    Chat getChat(Long chatId);

    List<Chat> getChatsForUser(String userId);

    Chat checkForExistingChat(String userId1, String userId2);
    
    void deleteChatsWithZeroMessages(List<Chat> chats);

    void deleteChat(Long chatId);

    void addEmitter(Long chatId, SseEmitter emitter);

    void removeEmitter(Long chatId, SseEmitter emitter);

    void sendMessage(Long chatId, Message message);
}
