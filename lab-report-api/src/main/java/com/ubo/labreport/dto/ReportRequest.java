package com.ubo.labreport.dto;

public record ReportRequest(
        String patientFirstName,
        String patientLastName,
        String identityNumber,
        String diagnosis,
        String diagnosisDetails){
}
