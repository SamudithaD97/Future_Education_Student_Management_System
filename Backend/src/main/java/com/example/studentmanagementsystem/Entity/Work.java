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
@Table(name = "work")
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_id")
    private Long workId;

    @Column(name = "workCreatedDate")
    private LocalDate workCreatedDate;

    @Column(name = "topic")
    private String topic;

    @Column(name = "doc_path")
    private String docPath;

    @Column(name = "created-by")
    private String createdBy;

    @JoinColumn(name = "class_id",referencedColumnName = "class_id")
    @ManyToOne
    private Sclass classId;


}
