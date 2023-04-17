package com.example.studentmanagementsystem.DTO;

import com.example.studentmanagementsystem.Entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@AllArgsConstructor
public class TeacherEnrolledClassesDto {
    private Long classId;
    private String subject;
    private Long noOfCredits;
}
