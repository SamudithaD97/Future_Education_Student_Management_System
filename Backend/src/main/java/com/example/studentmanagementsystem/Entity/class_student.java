package com.example.studentmanagementsystem.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "class_student")
public class class_student {
    @Id
    @Column(name = "class_id")
    private Long classId;

    @Id
    @Column(name = "student_id")
    private Long studentId;

    @JoinColumn(name = "student_id",referencedColumnName = "student_id")
    @ManyToOne
    @JsonIgnore
    private Student student;

    @JoinColumn(name = "class_id",referencedColumnName = "class_id")
    @ManyToOne
    @JsonIgnore
    private Sclass sclass;
}
