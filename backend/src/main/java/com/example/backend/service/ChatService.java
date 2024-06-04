package com.example.backend.service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;

import java.util.List;

public interface ChatService {
    Chat startChatWithMessage(String initiatorId, String responderId, String senderId, String messageContent);

    Message sendMessage(Long chatId, String senderId, String content);

    List<Message> getMessages(Long chatId);

    Chat getChat(Long chatId);

    List<Chat> getChatsForUser(String userId);
}
