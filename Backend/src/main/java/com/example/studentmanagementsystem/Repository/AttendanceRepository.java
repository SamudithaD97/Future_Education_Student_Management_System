package com.example.studentmanagementsystem.Repository;

import com.example.studentmanagementsystem.DTO.AttendanceDto;
import com.example.studentmanagementsystem.DTO.StudentEnrolledClassesDto;
import com.example.studentmanagementsystem.Entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("SELECT new com.example.studentmanagementsystem.DTO.AttendanceDto(a.studentId.regNo) FROM Attendance a WHERE CAST(a.attendanceCreatedDate as string) IN :date AND a.classId.classId IN:classId ")
    List<AttendanceDto> findAttendanceOfStudents(String date,Long classId);

    @Query("SELECT a.classId.subject FROM Attendance a WHERE CAST(a.attendanceCreatedDate as string) IN :date AND a.classId.classId IN:classId")
    String findAttendanceDetailsOfStudents(String date,Long classId);

    @Query("SELECT DATE_FORMAT(a.attendanceCreatedDate, '%Y-%m-%d %H:%i:%s') AS formattedDateTime FROM Attendance a WHERE a.attendanceId IN :attendanceId")
    String findDate(Long attendanceId);

}
