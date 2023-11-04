package com.ubo.labreport.dto;


import java.util.UUID;

public record ReportRequest(
        String patientFirstName,
        String patientLastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails,
        UUID laborantId
){
}
