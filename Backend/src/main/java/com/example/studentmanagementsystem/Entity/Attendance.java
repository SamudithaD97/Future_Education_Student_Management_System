package com.example.studentmanagementsystem.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;
@Data
@Getter
@Setter
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Long attendanceId;

    @Column(name = "attendanceCreatedDate")
    private LocalDate attendanceCreatedDate;

    @Column(name = "time_priod")
    private String timePeriod;

    @JoinColumn(name = "class_id",referencedColumnName = "class_id")
    @ManyToOne

    private Sclass classId;

    @JoinColumn(name = "student_id",referencedColumnName = "student_id")
    @ManyToOne

    private Student studentId;
}
