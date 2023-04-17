package com.example.studentmanagementsystem.Controller;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Service.SClass.SClassService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/sclass")
public class SClass {
    private final SClassService sClassService;

    @GetMapping("/get-subjects")
    List<Sclass> getSubjects(){
        log.info("Requested to get subjects");
        return sClassService.getSubjects();
    }


    @PostMapping(value = "/create")
    public ResponseEntity<?> createClass(@RequestBody Sclass sclass) {
        log.info("Requested to create class", sclass);
        return sClassService.createClass(sclass);
    }

}
