package com.example.backend.controller;

import com.example.backend.dto.ExpoPushTokenDto;
import com.example.backend.entity.ExpoPushToken;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.ExpoPushTokenRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private ExpoPushTokenRepository expoPushTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save-token")
    public ResponseEntity<?> saveToken(@RequestBody ExpoPushTokenDto expoPushTokenDto) {
        String token = expoPushTokenDto.getToken();
        String userId = expoPushTokenDto.getUserId();
        ExpoPushToken existingToken = expoPushTokenRepository.findByUserId(userId);
        if (existingToken != null) {
            // Update the token if it already exists
            existingToken.setToken(token);
            expoPushTokenRepository.save(existingToken);
            return ResponseEntity.ok().build();
        }
        expoPushTokenRepository.save(new ExpoPushToken(token, userId));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendPushNotification(@RequestBody Map<String, String> payload) {
        String recipientId = payload.get("recipientId");
        String title = payload.get("title");
        String body = payload.get("body");
        User recipient = userRepository.findById(recipientId).orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));
        ExpoPushToken expoPushToken = expoPushTokenRepository.findByUserId(recipient.getUserId());
        String url = "https://exp.host/--/api/v2/push/send";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Map<String, Object> notification = new HashMap<>();
        notification.put("to", expoPushToken.getToken());
        notification.put("title", title);
        notification.put("body", body);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(notification, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send push notification");
        }
    }
}
