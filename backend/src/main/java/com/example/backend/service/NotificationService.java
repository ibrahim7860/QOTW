package com.example.backend.service;

import com.example.backend.entity.ExpoPushToken;

public interface NotificationService {
    ExpoPushToken saveToken(String token, String userId);

    String getTokenByUserId(String recipientId);
}
