package com.example.backend.service;

import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import com.example.backend.repository.ChatRepository;
import com.example.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Override
    public Chat checkForExistingChat(String userId1, String userId2) {
        Optional<Chat> chat = chatRepository.findByParticipant1IdAndParticipant2Id(userId1, userId2);
        if (chat.isEmpty()) {
            // Try the reverse as well, since the order of participants might be reversed.
            chat = chatRepository.findByParticipant1IdAndParticipant2Id(userId2, userId1);
        }
        return chat.orElse(null);
    }

    @Override
    @Transactional
    public void deleteChat(Long chatId) {
        messageRepository.deleteByChat_ChatId(chatId);
        chatRepository.deleteById(chatId);
    }
}

