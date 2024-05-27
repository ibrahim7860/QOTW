package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

    @JoinColumn(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "profile_picture", nullable = false)
    private String profilePicture;

    public Profile(String userId, String imageUrl) {
        this.userId = userId;
        this.profilePicture = imageUrl;
    }
}
