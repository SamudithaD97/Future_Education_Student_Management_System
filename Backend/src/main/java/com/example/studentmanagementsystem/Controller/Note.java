package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.DTO.NoteDetailsDto;
import com.example.studentmanagementsystem.DTO.NoteUpdateDto;
import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Entity.Teacher;
import com.example.studentmanagementsystem.Service.Note.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/note")
public class Note {
    private final NoteService noteService;
    @GetMapping("/display")
    List<NoteDetailsDto> getNotes(@RequestParam("Id") Long Id,
                                  @RequestParam("isStudent") Boolean isStudent){
        log.info("Requested to get class Details By Student Id {}", Id);
        return noteService.getNotes(Id,isStudent);}

    @PostMapping(value = "/add")
    public ResponseEntity<?> addNote(@RequestBody com.example.studentmanagementsystem.Entity.Note note) {
        com.example.studentmanagementsystem.Entity.Note newNote = noteService.addNote(note);
        System.out.println(newNote);
        return new ResponseEntity<>(newNote, HttpStatus.OK);
 }

    @PostMapping(value = "/update")
    public ResponseDto updateNote(@RequestParam("noteId") Long noteId,
                                  @RequestParam("title") String title,
                                  @RequestParam("description") String description) {
        log.info("Request to update notes {}", noteId);
        return noteService.updateNote(noteId,title,description);
    }

    @DeleteMapping(value = "/delete/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable("noteId") Long noteId){
        return noteService.deleteNote(noteId);
    }

}
