package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import com.example.backend.service.jwt.UserDetailsServiceImp;
import com.example.backend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationDto userRegistrationDto) {
        User createdUser = userService.registerUser(userRegistrationDto);
        if (createdUser == null) {
            return new ResponseEntity<>("User is not created, try again later.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        userService.verifyUser(token);
        return ResponseEntity.ok("Email verified successfully.");
    }

    @PostMapping("/authentication")
    public AuthenticationResponseDto createAuthenticationToken(@RequestBody AuthenticationRequestDto authenticationRequest, HttpServletResponse response) throws BadCredentialsException, UsernameNotFoundException, IOException
    {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserId(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or Password.");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created, Register user first.");
            return null;
        }

        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(authenticationRequest.getUserId());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthenticationResponseDto(jwt, "User authenticated");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody @Valid AuthenticationRequestDto authenticationRequest) {
        AuthenticationResponseDto response = userService.authenticateUser(authenticationRequest);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}

