package com.example.backend.reaction;

import com.example.backend.response.Response;
import com.example.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reactions")
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reactionId;

    @ManyToOne
    @JoinColumn(name = "responseId", nullable = false)
    private Response response;

    @ManyToOne
    @JoinColumn(name = "reactorUserId", nullable = false)
    private User reactor;
}

