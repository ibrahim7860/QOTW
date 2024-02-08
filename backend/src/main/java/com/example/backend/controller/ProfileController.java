package com.example.backend.controller;

import com.example.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/{userId}/picture")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            profileService.uploadImage(userId, file);
            return ResponseEntity.ok().body("Profile picture updated successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not update profile picture.");
        }
    }

    @PostMapping("/{userId}/update-picture")
    public ResponseEntity<?> updateProfilePicture(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            profileService.updateProfilePicture(userId, file);
            return ResponseEntity.ok().body("Profile picture updated successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not update profile picture.");
        }
    }

    @GetMapping("/{userId}/get-picture")
    public ResponseEntity<?> downloadProfilePicture(@PathVariable String userId) throws IOException {
        byte[] imageData = profileService.downloadImage(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
