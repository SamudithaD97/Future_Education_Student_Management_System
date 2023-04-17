package com.example.studentmanagementsystem.Controller.Login;

import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Entity.Teacher;
import com.example.studentmanagementsystem.Repository.StudentRepository;
import com.example.studentmanagementsystem.Service.Student.StudentService;
import com.example.studentmanagementsystem.Service.Teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("")
public class Login {
    private final StudentService studentService;

    private final TeacherService teacherService;

    @PostMapping(value = "/student-login")
    public ResponseEntity<?> studentLogin(@RequestBody Student student) {
        Student logedUser = studentService.verifyUser(student.getUsername(), student.getPassword());

        return logedUser!=null? new ResponseEntity<>(logedUser, HttpStatus.OK) :  new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping(value = "/student-register")
    public ResponseEntity<?> studentRegister(@RequestBody Student student) {
        Student newUser = studentService.registerStudent(student);
        System.out.println(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
//        return newUser!=null? new ResponseEntity<>(newUser,HttpStatus.OK) :  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/teacher-login")
    public ResponseEntity<?> teacherLogin(@RequestBody Teacher teacher) {
        Teacher logedUser = teacherService.verifyUser(teacher.getUsername(), teacher.getPassword());

        return logedUser!=null? new ResponseEntity<>(logedUser, HttpStatus.OK) :  new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping(value = "/teacher-register")
    public ResponseEntity<?> teacherRegister(@RequestBody Teacher teacher) {
        Teacher newUser = teacherService.registerTeacher(teacher);
        System.out.println(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
//        return newUser!=null? new ResponseEntity<>(newUser,HttpStatus.OK) :  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
