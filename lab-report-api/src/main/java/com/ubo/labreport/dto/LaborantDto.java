package com.ubo.labreport.dto;

import com.ubo.labreport.model.Report;

import java.util.List;
import java.util.UUID;

public record LaborantDto(
        UUID id,
        String firstName,
        String lastName,
        String hospitalId,
        List<Report> reports
) {
}
