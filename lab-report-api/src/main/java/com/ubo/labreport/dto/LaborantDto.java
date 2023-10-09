package com.ubo.labreport.dto;

import com.ubo.labreport.model.Report;

import java.util.List;

public record LaborantDto(
        String id,
        String firstName,
        String lastName,
        String hospitalId,

        List<Report> reports
) {
}
