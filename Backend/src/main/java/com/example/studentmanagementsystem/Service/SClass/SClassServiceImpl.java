package com.example.studentmanagementsystem.Service.SClass;

import com.example.studentmanagementsystem.DTO.ResponseDto;
import com.example.studentmanagementsystem.Entity.Note;
import com.example.studentmanagementsystem.Entity.Sclass;
import com.example.studentmanagementsystem.Repository.SclassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
@Slf4j
@RequiredArgsConstructor
public class SClassServiceImpl implements SClassService {

    @Autowired
    private final SclassRepository sclassRepository;
    @Override
    public List<Sclass> getSubjects(){
        List<Sclass> subList=sclassRepository.getSubjects();
        return subList;
    }

    @Override
    public ResponseEntity<?> createClass(Sclass sclass){
        try {
            Sclass sclass1 = sclassRepository.save(sclass);
            return new ResponseEntity<>(sclass1, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);

        }
    }
}
