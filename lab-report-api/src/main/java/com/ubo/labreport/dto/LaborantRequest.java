package com.ubo.labreport.dto;

public record LaborantRequest(
        String firstName,
        String lastName,
        String hospitalId
) {
}
