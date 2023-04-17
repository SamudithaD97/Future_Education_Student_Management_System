package com.example.studentmanagementsystem.Service.Mail;



import com.example.studentmanagementsystem.DTO.MailData;
import com.example.studentmanagementsystem.DTO.MailRequest;
import com.example.studentmanagementsystem.DTO.MailResponse;

import java.util.Map;

public interface EmailService {

    MailResponse sendEmailWithHtmlContent(MailRequest request, MailData mailData);


}
