package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.BlacklistedToken;
import com.example.backend.entity.PasswordResetToken;
import com.example.backend.entity.User;
import com.example.backend.entity.VerificationToken;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.BlacklistedTokenRepository;
import com.example.backend.repository.PasswordResetTokenRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VerificationTokenRepository;
import com.example.backend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailServiceImpl emailServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserRegistrationDto registerUser(UserRegistrationDto userRegistrationDto) {
        if (userRepository.existsByUserId(userRegistrationDto.getUserId())) {
            throw new CustomAuthenticationException("Username already in use", HttpStatus.CONFLICT);
        }
        if (userRepository.existsByEmail(userRegistrationDto.getEmail())) {
            throw new CustomAuthenticationException("Email already in use", HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setUserId(userRegistrationDto.getUserId());
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        user = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);

        emailServiceImpl.sendVerificationEmail(user, token);

        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(userRegistrationDto.getUserId());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        userRegistrationDto.setJwt(jwt);

        return userRegistrationDto;
    }

    public void verifyUser(String token) {
        if (blacklistedTokenRepository.existsByToken(token)) {
            throw new CustomAuthenticationException("Token has been invalidated", HttpStatus.UNAUTHORIZED);
        }

        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new CustomAuthenticationException("Token is invalid or expired", HttpStatus.BAD_REQUEST);
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);
    }

    public void blacklistToken(String authHeader) {
        String token = authHeader.substring(7);
        BlacklistedToken blacklistedToken = new BlacklistedToken(token, LocalDateTime.now().plusDays(1)); // Token expires in 1 day
        blacklistedTokenRepository.save(blacklistedToken);
    }

    public void processForgotPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
        emailServiceImpl.sendPasswordResetEmail(user, token);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new CustomAuthenticationException("Invalid or expired token", HttpStatus.BAD_REQUEST);
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }

    public AuthenticationResponseDto authenticateAndGenerateToken(AuthenticationRequestDto authenticationRequest, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserId(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new CustomAuthenticationException("Incorrect Username or Password.", HttpStatus.UNAUTHORIZED);
        } catch (DisabledException e) {
            throw new CustomAuthenticationException("User is not created, Register user first.", HttpStatus.NOT_FOUND);
        }

        User user = userRepository.findFirstByUserId(authenticationRequest.getUserId());
        if (!user.isEmailVerified()) {
            throw new CustomAuthenticationException("Email is not verified, please verify email.", HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(authenticationRequest.getUserId());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
        authenticationResponseDto.setUserId(user.getUserId());
        authenticationResponseDto.setJwt(jwt);
        authenticationResponseDto.setFullName(user.getFirstName() + " " + user.getLastName());
        authenticationResponseDto.setMessage("User authenticated");

        return authenticationResponseDto;
    }
}
