package com.ubo.labreport.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ReportDto(
        UUID id,
        String patientFirstName,
        String patientLastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails,
        LocalDateTime givenDate) {
}
