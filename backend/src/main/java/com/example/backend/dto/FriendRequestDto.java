package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FriendRequestDto {
    @NotBlank(message = "Friendship ID cant be blank")
    private Long friendship_id;

    @NotBlank(message = "Requester ID cant be blank")
    private String requester_id;

    @NotBlank(message = "Receiver ID cant be blank")
    private String receiver_id;

    @NotBlank(message = "Status cant be blank")
    private String status;
}
