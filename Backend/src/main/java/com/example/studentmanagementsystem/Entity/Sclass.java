package com.example.studentmanagementsystem.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@Table(name = "Sclass")
public class Sclass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Long classId;

    @Column(name = "subject",nullable = false)
    private String subject;


    @Column(name = "noOfCredits")
    private Long noOfCredits;

    @OneToMany(mappedBy = "classId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<class_student> classStudentCollection;

    @OneToMany(mappedBy = "classId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<class_student> classTeacherCollection;

    @OneToMany(mappedBy = "classId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Attendance> attendanceCollection;

    @OneToMany(mappedBy = "classId",cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Work> workCollection;
}
