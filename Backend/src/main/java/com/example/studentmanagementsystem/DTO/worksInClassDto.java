package com.example.studentmanagementsystem.DTO;

import com.example.studentmanagementsystem.Entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Getter
@AllArgsConstructor
public class worksInClassDto {
    private String topic;
    private String docPath;
    private String createdDate;

    private String createdBy;
}
