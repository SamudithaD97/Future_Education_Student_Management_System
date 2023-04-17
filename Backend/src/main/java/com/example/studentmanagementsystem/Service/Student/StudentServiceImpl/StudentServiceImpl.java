package com.example.studentmanagementsystem.Service.Student.StudentServiceImpl;

import com.example.studentmanagementsystem.DTO.*;
import com.example.studentmanagementsystem.Entity.Attendance;
import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Repository.SclassRepository;
import com.example.studentmanagementsystem.Repository.StudentRepository;
import com.example.studentmanagementsystem.Repository.TeacherRepository;
import com.example.studentmanagementsystem.Service.Mail.EmailService;
import com.example.studentmanagementsystem.Service.Student.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    @Autowired
    private final SclassRepository sclassRepository;

    @Autowired
    private final TeacherRepository teacherRepository;

    private final EmailService emailService;


    public List<StudentEnrolledClassesDto> getStudentEnrolledClasses(Long studentId){
        List<StudentEnrolledClassesDto> classList = sclassRepository.findClassesByStudentId(studentId);
        return classList;

    }

    @Override
    public Student registerStudent(Student student) {
        boolean match =Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$",student.getPassword());

        if(match){
            String pass = Hashing.sha256()
                    .hashString(student.getPassword(), StandardCharsets.UTF_8)
                    .toString();
            student.setPassword(pass);
            System.out.println(student);
            Student newusr = studentRepository.save(student);

            // Send Email
            MailRequest mailRequest = new MailRequest();
            mailRequest.setTo(newusr.getUsername());
            mailRequest.setSubject("New User Created");
            MailData mailData = new MailData();
            String[] details = {"User Details"};
            String[] detailsDescription1 = {"User Full Name:"+newusr.getFullName(),"Designation:Teacher","Contact Number:"+newusr.getContactNo()};
            String[] detailsDescription2 = {};
            String[] detailsDescription3 = {};
            String[] detailsDescription4 = {};
            mailData.setHeader("Student Management System- New User(Student) Created");
            mailData.setHeaderDescription("You are successfully registered to the Student Management System.");
            mailData.setDescription("");
            mailData.setDetails(details);
            mailData.setDetailsDescription1(detailsDescription1);
            mailData.setDetailsDescription2(detailsDescription2);
            mailData.setDetailsDescription3(detailsDescription3);
            mailData.setDetailsDescription4(detailsDescription4);

            emailService.sendEmailWithHtmlContent(mailRequest, mailData);
            return newusr;
        }
        return null;
    }

    @Override
    public Student verifyUser(String username, String password) {
        Student user = studentRepository.findByUsername(username);
        //match password 8 characters and atleast one character and number
        boolean match = Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$",password);
        System.out.println(match);
        String pass = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();

        return pass.equals(user.getPassword()) && match ? user : null;
    }
    @Override
    public ResponseDto enrollClass(Long classId, Long studentId) {
        try {
            studentRepository.enrollClass(studentId,classId);
            return new ResponseDto("Successfully added", "01");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto("Failed", "02");

        }
    }



}
