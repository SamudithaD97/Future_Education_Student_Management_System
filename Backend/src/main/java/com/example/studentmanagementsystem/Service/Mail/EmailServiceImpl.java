package com.example.studentmanagementsystem.Service.Mail;

import com.example.studentmanagementsystem.DTO.MailData;
import com.example.studentmanagementsystem.DTO.MailRequest;
import com.example.studentmanagementsystem.DTO.MailResponse;
import com.example.studentmanagementsystem.Service.Mail.Helper.TableGenerationService;
import jakarta.mail.MessagingException;
import freemarker.template.Configuration;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EmailServiceImpl implements  EmailService{

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private Configuration config;

    @Autowired
    private TableGenerationService tableGenerationService;
    public MailResponse sendEmailWithHtmlContent(MailRequest request, MailData mailData) {
        MailResponse response = new MailResponse();
        MimeMessage message = sender.createMimeMessage();
        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            String html = tableGenerationService.generateReportMessage(mailData);
            helper.setTo(request.getTo());
            helper.setText(html, true);
            helper.setSubject(request.getSubject());
            helper.setFrom("samudithawijesundara@gmail.com");
            sender.send(message);

            response.setMessage("mail send to : " + request.getTo());
            log.info("mail send to : " + request.getTo());
            response.setStatus(Boolean.TRUE);

        } catch (MessagingException e) {
            response.setMessage("Mail Sending failure : " + e.getMessage());
            log.info("Mail Sending failure : " + e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }
}
