package com.ubo.labreport.dto;

import java.time.LocalDateTime;

public record ReportDto(
        String id,
        String patientFirstName,
        String patientLastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails,
        LocalDateTime givenDate) {
}
