package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.DTO.ReportResponse;
import com.example.studentmanagementsystem.Service.Report.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/report")
public class Report {

    private final ReportService reportService;

    @GetMapping("/get-attendance")
    public ReportResponse getAttendanceDetails(@RequestParam("date") String date,
                                               @RequestParam("classId") Long classId) {
        log.info("Requested to get attendance details of {} and classId {} ", date,classId);
        return reportService.getAttendanceDetails(date, classId);
    }

    @GetMapping("/getDate")
    public String getDate() {
        log.info("Requested to get attendance details of {} and classId {} ");
        return reportService.getDate();
    }
}
