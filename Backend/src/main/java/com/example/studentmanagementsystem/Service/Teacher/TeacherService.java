package com.example.studentmanagementsystem.Service.Teacher;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.DTO.TeacherEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Entity.Teacher;

import java.util.List;

public interface TeacherService {
    Teacher registerTeacher(Teacher teacher);
    Teacher verifyUser(String username, String password);


    ResponseDto enrollClass(Long classId, Long teacherId);

    List<TeacherEnrolledClassesDto> getTeacherEnrolledClasses(Long teacherId);
}
