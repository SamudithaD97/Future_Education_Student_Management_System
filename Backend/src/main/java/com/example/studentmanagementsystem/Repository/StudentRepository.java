package com.example.studentmanagementsystem.Repository;

import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Student;
import jakarta.transaction.Transactional;
import org.hibernate.sql.Insert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByUsername(String username);

    @Modifying
    @Query("insert into class_student (studentId,classId) VALUES (:studentId,:classId)")
    @Transactional
    void enrollClass(@Param("studentId") Long studentId, @Param("classId") Long classId);

    Optional<Student> findByStudentId(Long stId);
}





