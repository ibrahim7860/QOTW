package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(nullable = false)
    private String senderId;

    @Column(nullable = false)
    private String content;
}