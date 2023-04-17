package com.example.studentmanagementsystem.Repository;


import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.DTO.TeacherEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SclassRepository extends JpaRepository<Sclass, Long> {

    @Query("SELECT new com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto(c.classId,c.sclass.subject,c.sclass.noOfCredits) FROM class_student c  WHERE c.student.studentId IN :studentId ")
    List<StudentEnrolledClassesDto> findClassesByStudentId(Long studentId);

    @Query("SELECT a.subject FROM Sclass a WHERE  a.classId IN:classId")
    String findClassNameByAId(Long classId);

    @Query("SELECT a.classId FROM Sclass a WHERE  a.subject IN:subject")
    Long findClassIDByClassName(String subject);

    @Query("SELECT a FROM Sclass a")
    List<Sclass> getSubjects();

    @Query("SELECT new com.example.studentmanagementsystem.DTO.TeacherEnrolledClassesDto(c.classId,c.sclass.subject,c.sclass.noOfCredits) FROM class_teacher c  WHERE c.teacherId IN :teacherId ")
    List<TeacherEnrolledClassesDto> findClassesByTeacherId(Long teacherId);

}
