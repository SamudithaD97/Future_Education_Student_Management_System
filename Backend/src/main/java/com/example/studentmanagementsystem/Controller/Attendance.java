package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.Service.Attendance.AttendanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/attendance")
public class Attendance {
    private final AttendanceService attendanceService;

    @PostMapping(value = "/add")
    public ResponseEntity<?> addAttendance(@RequestBody com.example.studentmanagementsystem.Entity.Attendance attendance) {
        com.example.studentmanagementsystem.Entity.Attendance newAttendance = attendanceService.addAttendance(attendance);
        System.out.println(newAttendance);
        return new ResponseEntity<>(newAttendance, HttpStatus.OK);
    }
}
