package com.ubo.labreport.dto;

import java.time.LocalDateTime;

public record ReportDto(
        String id,
        String firstName,
        String lastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails,
        LocalDateTime givenDate) {
}
