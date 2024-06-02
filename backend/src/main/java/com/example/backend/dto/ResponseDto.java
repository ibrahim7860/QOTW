package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {

    private Long responseId;

    @NotBlank(message = "User id cannot be blank")
    private String userId;

    @NotBlank(message = "Question id cannot be blank")
    private Long questionId;

    @NotBlank(message = "Response text cannot be blank")
    private String responseText;

    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

}
