package com.example.backend.dto;

import lombok.Data;

@Data
public class MessageDto {
    Long chatId;
    String senderId;
    String content;
}
