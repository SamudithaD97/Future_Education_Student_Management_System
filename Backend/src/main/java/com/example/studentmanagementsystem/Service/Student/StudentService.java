package com.example.studentmanagementsystem.Service.Student;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Entity.Student;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface StudentService {
    List<StudentEnrolledClassesDto> getStudentEnrolledClasses(Long studentId);
    Student registerStudent(Student student);
    Student verifyUser(String username, String password);

    ResponseDto enrollClass(Long classId, Long studentId);
}
