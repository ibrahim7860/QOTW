package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FriendRequestDto {

    @NotBlank(message = "User 1 ID cant be blank")
    private String user_1_id;

    @NotBlank(message = "User 2 ID cant be blank")
    private String user_2_id;

    @NotBlank(message = "Status cant be blank")
    private String status;


}
