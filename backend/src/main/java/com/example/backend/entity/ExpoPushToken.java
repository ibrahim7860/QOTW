package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "expo_push_token")
@NoArgsConstructor
@Data
public class ExpoPushToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    private String userId;

    public ExpoPushToken(String token, String userId) {
        this.token = token;
        this.userId = userId;
    }
}
