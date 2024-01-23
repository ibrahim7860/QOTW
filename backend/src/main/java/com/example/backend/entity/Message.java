package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne
    @JoinColumn(name = "senderUserId", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiverUserId", nullable = false)
    private User receiver;

    @Column(name = "message_text", nullable = false)
    private String messageText;

    @Column(name = "date_sent", nullable = false)
    private LocalDateTime dateSent;
}

