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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendshipId;

    @ManyToOne
    @JoinColumn(name = "requesterId", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "receiverId", nullable = false)
    private User receiver;

    @Column(nullable = false)
    private String status;

    @Column(name = "date_friended", nullable = false)
    private LocalDateTime dateFriended;
}

