package com.example.studentmanagementsystem.Service.Report;

import com.example.studentmanagementsystem.DTO.ReportResponse;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReportService {
    ReportResponse getAttendanceDetails(String date,Long classId);

    String  getDate();
}
