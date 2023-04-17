package com.example.studentmanagementsystem.Service.Note;

import com.example.studentmanagementsystem.DTO.NoteDetailsDto;
import com.example.studentmanagementsystem.DTO.NoteUpdateDto;
import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Entity.Teacher;
import com.example.studentmanagementsystem.Repository.NoteRepository;
import com.example.studentmanagementsystem.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {
    @Autowired
    private final NoteRepository noteRepository;


    @Override
    public List<NoteDetailsDto> getNotes(Long Id,Boolean isStudent) {
        if (isStudent==true){
            List<NoteDetailsDto> note = noteRepository.findNotesByStudentId(Id);
            return note;
        }else {
            List<NoteDetailsDto> note = noteRepository.findNotesByTeacherId(Id);
            return note;
        }

    }

    @Override
    public Note addNote(Note note) {
        note.setNoteCreatedDate(LocalDateTime.now());
        Note newnote = noteRepository.save(note);
        return newnote;
    }

    @Override
    public ResponseDto updateNote(Long noteId,String title,String description) {

        Optional<Note> optionalNote = noteRepository.findByNoteId(noteId);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setTitle(title);
            note.setDescription(description);
            noteRepository.save(note);
            return new ResponseDto("User Updated And Email Sent", "00");

        } else {
            return new ResponseDto("Invalid User", "00");
        }

    }

    @Override
    public ResponseEntity<String> deleteNote(Long noteId) {
        try {
            noteRepository.deleteById(noteId);
            return ResponseEntity.ok().body("file deleted successfully");
        } catch (NullPointerException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
