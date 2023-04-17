package com.example.studentmanagementsystem.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDto {
    private String responseMessage;
    private String responseCode;
}
