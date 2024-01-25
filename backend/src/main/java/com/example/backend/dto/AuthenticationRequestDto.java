package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthenticationRequestDto {

    @NotBlank(message = "User ID cannot be blank")
    private String userId;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
