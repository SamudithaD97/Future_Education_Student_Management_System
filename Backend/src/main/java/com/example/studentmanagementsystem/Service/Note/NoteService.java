package com.example.studentmanagementsystem.Service.Note;

import com.example.studentmanagementsystem.DTO.NoteDetailsDto;
import com.example.studentmanagementsystem.DTO.NoteUpdateDto;
import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.Entity.Note;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NoteService {
    List<NoteDetailsDto> getNotes(Long Id, Boolean isStudent);

    Note addNote(Note note);

    ResponseDto updateNote(Long noteId,String title,String description);

    ResponseEntity<String> deleteNote(Long noteId);
}
