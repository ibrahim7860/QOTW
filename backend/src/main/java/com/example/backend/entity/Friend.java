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
    private Long friendship_id;

    //User 1 is the person who requests (requester) 
    @Column(name = "user_1_id", nullable = false)
    private String user_1_id;

    //User 2 is the receiver of the request (receiver)
    @Column(name = "user_2_id", nullable = false)
    private String user_2_id;

    @Column(name = "status", nullable = false)
    private String status;
}

