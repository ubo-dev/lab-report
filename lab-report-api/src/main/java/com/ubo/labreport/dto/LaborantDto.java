package com.ubo.labreport.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ubo.labreport.model.Report;

import java.util.List;
import java.util.UUID;

public record LaborantDto(
        UUID id,
        String firstName,
        String lastName,
        String hospitalId,
        @JsonIgnore
        List<Report> reports
) {
}
