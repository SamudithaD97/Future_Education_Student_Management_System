package com.example.studentmanagementsystem.Repository;

import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Entity.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Teacher findByUsername(String username);

    @Modifying
    @Query("insert into class_teacher (teacherId,classId) VALUES (:teacherId,:classId)")
    @Transactional
    void enrollClass(@Param("teacherId") Long teacherId, @Param("classId") Long classId);
}
