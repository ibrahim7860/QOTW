package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface UserService {
    User registerUser(UserRegistrationDto userRegistrationDto);
    AuthenticationResponseDto authenticateUser(AuthenticationRequestDto authenticationRequest);
    AuthenticationResponseDto authenticateAndGenerateToken(AuthenticationRequestDto authenticationRequest, HttpServletResponse response);
    void verifyUser(String token);
    void processForgotPassword(String email);
    void resetPassword(String token, String newPassword);
}
