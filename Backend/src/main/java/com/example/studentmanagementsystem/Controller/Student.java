package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Service.Student.StudentService;
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
@RequestMapping("/student")
public class Student {

    private final StudentService studentService;

    @GetMapping("/get-by-student-id/{studentId}")
    List<StudentEnrolledClassesDto> getStudentEnrolledClasses(@PathVariable("studentId") Long studentId){
        log.info("Requested to get class Details By Student Id {}", studentId);
        return studentService.getStudentEnrolledClasses(studentId);}


    @PostMapping(value = "/enroll")
    public ResponseDto enrollClass(@RequestParam("classId") Long classId,
                                   @RequestParam("studentId") Long studentId) {
        log.info("Requested to enroll class {} studentId{}", classId,studentId);
        return studentService.enrollClass(classId,studentId);
    }}




