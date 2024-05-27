package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import jakarta.servlet.http.HttpServletResponse;
import com.example.backend.entity.User;
import java.util.List;

public interface UserService {
    UserRegistrationDto registerUser(UserRegistrationDto userRegistrationDto);

    AuthenticationResponseDto authenticateAndGenerateToken(AuthenticationRequestDto authenticationRequest,
            HttpServletResponse response);

    void verifyUser(String token);

    void processForgotPassword(String email);

    void resetPassword(String token, String newPassword);

    void blacklistToken(String authHeader);

    List<String> getAllUsers();
}
