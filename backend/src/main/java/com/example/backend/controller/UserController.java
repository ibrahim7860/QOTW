package com.example.backend.controller;

import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationDto userRegistrationDto) {
        UserRegistrationDto createdUser = authService.createUser(userRegistrationDto);
        if(createdUser == null)
        {
            return new ResponseEntity<>("User is not created, try again later.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}

