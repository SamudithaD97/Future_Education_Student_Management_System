package com.example.studentmanagementsystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
public class NoteDetailsDto {
    private Long noteId;
    private String title;
    private String description;
    private LocalDateTime noteCreatedDate;

}
