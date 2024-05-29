package com.example.backend.controller;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationDto userRegistrationDto) {
        UserRegistrationDto createdUser = userService.registerUser(userRegistrationDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        userService.verifyUser(token);
        return ResponseEntity.ok("Email verified successfully.");
    }

    @GetMapping("/{userId}/status")
    public ResponseEntity<?> checkEmailVerificationStatus(@PathVariable String userId) {
        User user = userRepository.findFirstByUserId(userId);
        return ResponseEntity.ok(Map.of("email_verified", user.isEmailVerified()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> createAuthenticationToken(@RequestBody @Valid AuthenticationRequestDto authenticationRequest, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException {
        AuthenticationResponseDto authenticationResponse = userService.authenticateAndGenerateToken(authenticationRequest, response);
        return new ResponseEntity<>(authenticationResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        userService.blacklistToken(authHeader);
        return ResponseEntity.ok().body("User logged out successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@RequestParam String email) {
        userService.processForgotPassword(email);
        return ResponseEntity.ok("A password reset link has been sent to the user's email if it exists");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully.");
    }

    @GetMapping("/get-users")
    public ResponseEntity<?> getAllUsers() {
        List<String> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }
}

