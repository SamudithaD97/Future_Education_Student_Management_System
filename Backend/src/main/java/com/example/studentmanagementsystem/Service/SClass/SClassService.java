package com.example.studentmanagementsystem.Service.SClass;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.Entity.Sclass;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SClassService {
    List<Sclass> getSubjects();

    ResponseEntity<?> createClass(Sclass sclass);
}
