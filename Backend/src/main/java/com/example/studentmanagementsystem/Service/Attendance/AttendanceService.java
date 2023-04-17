package com.example.studentmanagementsystem.Service.Attendance;

import com.example.studentmanagementsystem.Entity.Attendance;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AttendanceService {
    Attendance addAttendance(com.example.studentmanagementsystem.Entity.Attendance attendance);
}
