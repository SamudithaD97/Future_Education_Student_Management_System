package com.example.studentmanagementsystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response {
    private String responseCode;
    private String responseMessage;
}
