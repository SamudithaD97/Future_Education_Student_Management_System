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
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long teacherId;

    @Column(name = "full_name",nullable = false)
    private String fullName;

    @Column(name = "username",nullable = false,unique = true)
    private String username;

    @Column(name = "designation")
    private String designation;

    @Column(name = "contact_number",length = 15)
    private String contactNo;

    @Column(name = "password")
    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @OneToMany(mappedBy = "teacherId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<class_teacher> classTeacherCollection;


}
