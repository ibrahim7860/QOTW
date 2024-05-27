package com.example.backend.controller;

import com.example.backend.entity.Profile;
import com.example.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/{userId}/update-picture")
    public ResponseEntity<?> updateProfilePicture(@PathVariable String userId, @RequestBody() String imageUrl) {
        try {
            Profile profile = profileService.saveProfile(userId, imageUrl);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not update profile picture.");
        }
    }

    @GetMapping("/{userId}/get-picture")
    public ResponseEntity<?> getProfilePicture(@PathVariable String userId) {
        Profile profile = profileService.getProfile(userId);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
