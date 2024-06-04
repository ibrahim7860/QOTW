package com.example.backend.dto;

import lombok.Data;

@Data
public class ChatInitiationRequest {
    private String initiatorId;
    private String responderId;
    private String senderId;
    private String messageContent;
}
