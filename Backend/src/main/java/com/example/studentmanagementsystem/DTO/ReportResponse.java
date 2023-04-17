package com.example.studentmanagementsystem.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportResponse {
    private byte[] bytesReport;
}

