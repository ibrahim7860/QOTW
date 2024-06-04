package com.example.backend.service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.repository.ChatRepository;
import com.example.backend.repository.MessageRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public Chat startChatWithMessage(String initiatorId, String responderId, String senderId, String messageContent) {
        AtomicBoolean newChatCreated = new AtomicBoolean(false);
        Chat chat = chatRepository.findByParticipant1IdAndParticipant2Id(initiatorId, responderId)
                .orElse(chatRepository.findByParticipant1IdAndParticipant2Id(responderId, initiatorId)
                        .orElseGet(() -> {
                            Chat newChat = new Chat();
                            newChat.setParticipant1Id(initiatorId);
                            newChat.setParticipant2Id(responderId);
                            newChat.setMessages(new ArrayList<>());
                            newChatCreated.set(true);
                            return chatRepository.save(newChat);
                        }));

        if (newChatCreated.get()) {
            Message message = new Message();
            message.setChat(chat);
            message.setSenderId(senderId);
            message.setContent(messageContent);
            chat.getMessages().add(message);
        }
        return chat;
    }

    @Override
    @Transactional
    public Message sendMessage(Long chatId, String senderId, String content) {
        Message newMessage = new Message();
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        newMessage.setChat(chat);
        newMessage.setSenderId(senderId);
        newMessage.setContent(content);
        return messageRepository.save(newMessage);

    }

    @Override
    public List<Message> getMessages(Long chatId) {
        return messageRepository.findAllByChatChatId(chatId);
    }

    @Override
    public Chat getChat(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found with ID: " + chatId));
    }

    @Override
    public List<Chat> getChatsForUser(String userId) {
        return chatRepository.findByParticipant1IdOrParticipant2Id(userId, userId);
    }
}

