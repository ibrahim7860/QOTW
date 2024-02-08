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
@Table(name = "friends")
public class Friend {
    @Id
    @Column(name = "friendship_id", nullable = false)
    private Long frienshipId;

    @Column(name = "requester_id", nullable = false)
    private String requesterId;

    @Column(name = "receiver_id", nullable = false)
    private String receiverId;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "date_friended", nullable = false)
    private LocalDateTime dateFriended;
}

