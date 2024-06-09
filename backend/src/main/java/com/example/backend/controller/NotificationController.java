package com.example.backend.controller;

import com.example.backend.dto.ExpoPushTokenDto;
import com.example.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/save-token")
    public ResponseEntity<?> saveToken(@RequestBody ExpoPushTokenDto expoPushTokenDto) {
        notificationService.saveToken(expoPushTokenDto.getToken(), expoPushTokenDto.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-token")
    public ResponseEntity<?> getTokenByUserId(@RequestParam String recipientId) {
        String expoPushToken = notificationService.getTokenByUserId(recipientId);
        if (expoPushToken == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Recipient has not registered for push notifications");
        } else {
            return ResponseEntity.ok(expoPushToken);
        }
    }
}
