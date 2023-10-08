package com.ubo.labreport.dto;

import java.time.LocalDateTime;

public record ReportRequest(
        String firstName,
        String lastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails){
}
