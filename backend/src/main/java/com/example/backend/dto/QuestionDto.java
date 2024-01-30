package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {

    private Long questionId;

    @NotBlank(message = "Question text cannot be blank")
    private String questionText;

    @NotNull(message = "Date posted cannot be null")
    private LocalDateTime datePosted;
}
