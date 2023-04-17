package com.example.studentmanagementsystem.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "reg_number",nullable = false,unique = true)
    private String regNo;

    @Column(name = "full_name",nullable = false)
    private String fullName;

    @Column(name = "username",nullable = false,unique = true)
    private String username;

    @Column(name = "contact_number",length = 15)
    private String contactNo;

    @Column(name = "password")
    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @OneToMany(mappedBy = "studentId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Attendance> attendanceCollection;

    @OneToMany(mappedBy = "studentId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<class_student> classStudentCollection;

}
