package com.example.studentmanagementsystem.Service.Attendance;

import com.example.studentmanagementsystem.Entity.Attendance;
import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
@Slf4j
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService{

    @Autowired
    private final AttendanceRepository attendanceRepository;
    @Override
    public Attendance addAttendance(com.example.studentmanagementsystem.Entity.Attendance attendance){
        attendance.setAttendanceCreatedDate(LocalDate.now());
        Attendance newAttendance = attendanceRepository.save(attendance);
        return newAttendance;

    }
}
