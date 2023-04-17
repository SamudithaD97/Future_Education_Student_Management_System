package com.example.studentmanagementsystem.Service.Work;

import com.example.studentmanagementsystem.DTO.MailData;
import com.example.studentmanagementsystem.DTO.MailRequest;
import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.worksInClassDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Entity.Student;
import com.example.studentmanagementsystem.Entity.Work;
import com.example.studentmanagementsystem.Repository.StudentRepository;
import com.example.studentmanagementsystem.Repository.WorkRepository;
import com.example.studentmanagementsystem.Service.Mail.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class WorkServiceImpl implements WorkService {
    @Autowired
    private final WorkRepository workRepository;
    private final EmailService emailService;
    @Autowired
    private final StudentRepository studentRepository;


    @Override
    public List<worksInClassDto> getWorkDetailsInClass(Long classId){
        List<worksInClassDto> workList=workRepository.findClassesByStudentId(classId);
        return workList;
    }

    @Override
    public ResponseDto createWork(Work work){
        try {
            work.setWorkCreatedDate(LocalDate.now());
            Work work1 = workRepository.save(work);
            List<Long> stIdList = workRepository.findStudentIdByWorkID(work.getWorkId());

            for (Long stId : stIdList) {
                Optional<Student> student = studentRepository.findByStudentId(stId);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


                // Send Email
                MailRequest mailRequest = new MailRequest();
                mailRequest.setTo(student.get().getUsername());
                mailRequest.setSubject("New Work Added");
                MailData mailData = new MailData();
                String[] details = {"Work Details"};
                String[] detailsDescription1 = {"Topic: " + work.getTopic(), "Document Path: " + work.getDocPath(), "Created Date: " + work.getWorkCreatedDate()};
                String[] detailsDescription2 = {};
                String[] detailsDescription3 = {};
                String[] detailsDescription4 = {};
                mailData.setHeader("Student Management System- New Work Assign");
                mailData.setHeaderDescription("New Work Assign");
                mailData.setDescription("");
                mailData.setDetails(details);
                mailData.setDetailsDescription1(detailsDescription1);
                mailData.setDetailsDescription2(detailsDescription2);
                mailData.setDetailsDescription3(detailsDescription3);
                mailData.setDetailsDescription4(detailsDescription4);

                emailService.sendEmailWithHtmlContent(mailRequest, mailData);

            }
            return new ResponseDto("Successfully added and Email sent", "01");
        }

            catch(Exception e){
                e.printStackTrace();
                return new ResponseDto("Failed", "02");
            }
        }

}


