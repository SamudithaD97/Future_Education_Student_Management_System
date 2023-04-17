package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.DTO.TeacherEnrolledClassesDto;
import com.example.studentmanagementsystem.Service.Teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/teacher")
public class Teacher {
    private final TeacherService teacherService;

    @PostMapping(value = "/enroll")
    public ResponseDto enrollClass(@RequestParam("classId") Long classId,
                                   @RequestParam("teacherId") Long teacherId) {
        log.info("Requested to enroll class {} teacherId{}", classId,teacherId);
        return teacherService.enrollClass(classId,teacherId);
    }

    @GetMapping("/get-by-teacher-id/{teacherId}")
    List<TeacherEnrolledClassesDto> getTeacherEnrolledClasses(@PathVariable("teacherId") Long teacherId){
        log.info("Requested to get class Details By teacher Id {}", teacherId);
        return teacherService.getTeacherEnrolledClasses(teacherId);}


}
