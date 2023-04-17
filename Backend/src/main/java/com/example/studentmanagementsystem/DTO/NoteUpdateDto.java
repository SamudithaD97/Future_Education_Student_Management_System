package com.example.studentmanagementsystem.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoteUpdateDto {
    private Long noteId;
    private String title;
    private String description;
}
