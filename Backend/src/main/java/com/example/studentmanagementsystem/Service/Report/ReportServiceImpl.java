package com.example.studentmanagementsystem.Service.Report;

import com.example.studentmanagementsystem.DTO.AttendanceDto;
import com.example.studentmanagementsystem.DTO.EmptyReportDataSource;
import com.example.studentmanagementsystem.DTO.ReportResponse;
import com.example.studentmanagementsystem.Repository.AttendanceRepository;
import com.example.studentmanagementsystem.Repository.SclassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
@Slf4j
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    @Autowired
    private final AttendanceRepository attendanceRepository;

    @Autowired
    private final SclassRepository sclassRepository;
    public ReportResponse generatePDF(String path, JRBeanCollectionDataSource
            dataSource, Map<String, Object> parameters) {
        try {

            JasperDesign jasperDesign = JRXmlLoader.load(this.getClass().getResourceAsStream(path));
            JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            //export PDF
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            return ReportResponse.builder().bytesReport(JasperExportManager.exportReportToPdf(jasperPrint)).build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ReportResponse getEmptyPdf() {
        String path = "/report/emptyPdf.jrxml";

        Map<String, Object> parameters = new HashMap<>();
        List<EmptyReportDataSource> dataList = new ArrayList<>();
        EmptyReportDataSource data = new EmptyReportDataSource();
        data.setNote("TEST");
        dataList.add(data);
        parameters.put("title", "No data found");
        //set dataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dataList);
        return generatePDF(path, dataSource, parameters);
    }
    @Override
    public ReportResponse getAttendanceDetails(String date,Long classId){
        try {
            List<AttendanceDto> dataList = attendanceRepository.findAttendanceOfStudents(date,classId);
            String subject =sclassRepository.findClassNameByAId(classId);
            if (dataList.isEmpty()) {
                return getEmptyPdf();
            } else {
                String path = "/report/attendancePdf.jrxml";

                Map<String, Object> parameters = new HashMap<>();
                parameters.put("className",subject );
                parameters.put("date", "Date : "+date);
                //set dataSource
                JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dataList);
                return generatePDF(path, dataSource, parameters);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }}

        @Override
        public String getDate(){
            String Sdate=attendanceRepository.findDate(1L);
            return Sdate;

        }
    }

