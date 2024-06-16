package com.example.backend.service;

import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import com.example.backend.repository.ChatRepository;
import com.example.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
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
        List<Chat> chats = chatRepository.findByParticipant1IdOrParticipant2Id(userId, userId);


        chats = chats.stream()
                .filter(chat -> !chat.getMessages().isEmpty())
                .toList();

        List<Chat> chatsToDelete = chats.stream()
                .filter(chat -> chat.getMessages().isEmpty())
                .toList();

        deleteChatsWithZeroMessages(chatsToDelete);
        return chats;
    }

    @Override
    public void deleteChatsWithZeroMessages(List<Chat> chatsToDelete) {
        for (Chat chat : chatsToDelete) {
            if (chat.getMessages().isEmpty()) {
                chatRepository.delete(chat);
            }
        }
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

    private final Map<Long, List<SseEmitter>> emitters = new HashMap<>();

    public void addEmitter(Long chatId, SseEmitter emitter) {
        this.emitters.computeIfAbsent(chatId, id -> new ArrayList<>()).add(emitter);
    }

    public void removeEmitter(Long chatId, SseEmitter emitter) {
        List<SseEmitter> chatEmitters = this.emitters.get(chatId);
        if (chatEmitters != null) {
            chatEmitters.remove(emitter);
        }

    }

    public void sendMessage(Long chatId, Message message) {
        List<SseEmitter> chatEmitters = this.emitters.get(chatId);
        if (chatEmitters != null) {
            chatEmitters.forEach(emitter -> {
                try {
                    emitter.send(message);
                } catch (IOException e) {
                    emitter.complete();
                }
            });
        }
    }


}

