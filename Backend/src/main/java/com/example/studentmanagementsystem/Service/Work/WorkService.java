package com.example.studentmanagementsystem.Service.Work;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.DTO.worksInClassDto;
import com.example.studentmanagementsystem.Entity.Work;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface WorkService {
    List<worksInClassDto> getWorkDetailsInClass(Long classId);

    ResponseDto createWork(Work work);
}
