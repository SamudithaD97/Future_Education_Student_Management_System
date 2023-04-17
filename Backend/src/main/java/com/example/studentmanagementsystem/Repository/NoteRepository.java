package com.example.studentmanagementsystem.Repository;

import com.example.studentmanagementsystem.DTO.NoteDetailsDto;
import com.example.studentmanagementsystem.DTO.worksInClassDto;
import com.example.studentmanagementsystem.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note>findByStudentId(Long Id);

    Optional<Note> findByNoteId(Long noteId);

    List<Note>findByTeacherId(Long Id);

    @Query("SELECT new com.example.studentmanagementsystem.DTO.NoteDetailsDto(n.noteId,n.title, n.description, n.noteCreatedDate) FROM Note n WHERE n.studentId IN :Id")
    List<NoteDetailsDto> findNotesByStudentId(Long Id);

    @Query("SELECT new com.example.studentmanagementsystem.DTO.NoteDetailsDto(n.noteId,n.title, n.description, n.noteCreatedDate) FROM Note n WHERE n.teacherId IN :Id")
    List<NoteDetailsDto> findNotesByTeacherId(Long Id);

}
