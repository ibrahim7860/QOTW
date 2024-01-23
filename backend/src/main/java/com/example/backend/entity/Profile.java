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
    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "profile_picture", nullable = false)
    private String profilePicture;
}
