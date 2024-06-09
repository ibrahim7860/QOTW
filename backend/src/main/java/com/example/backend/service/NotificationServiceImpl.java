package com.example.backend.service;

import com.example.backend.entity.ExpoPushToken;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.ExpoPushTokenRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private ExpoPushTokenRepository expoPushTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ExpoPushToken saveToken(String token, String userId) {
        ExpoPushToken existingToken = expoPushTokenRepository.findByUserId(userId);
        if (existingToken != null) {
            // Update the token if it already exists
            existingToken.setToken(token);
            return expoPushTokenRepository.save(existingToken);
        }
        return expoPushTokenRepository.save(new ExpoPushToken(token, userId));
    }

    @Override
    public String getTokenByUserId(String recipientId) {
        User recipient = userRepository.findById(recipientId).orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));
        ExpoPushToken expoPushToken = expoPushTokenRepository.findByUserId(recipient.getUserId());
        return expoPushToken.getToken();
    }
}
