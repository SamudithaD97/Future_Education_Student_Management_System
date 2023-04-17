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
@Table(name = "class_teacher")
public class class_teacher {
    @Id
    @Column(name = "class_id")
    private Long classId;

    @Id
    @Column(name = "teacher_Id")
    private Long teacherId;

    @JoinColumn(name = "teacher_id",referencedColumnName = "teacher_id")
    @ManyToOne
    @JsonIgnore
    private Teacher teacher;

    @JoinColumn(name = "class_id",referencedColumnName = "class_id")
    @ManyToOne
    @JsonIgnore
    private Sclass sclass;
}
