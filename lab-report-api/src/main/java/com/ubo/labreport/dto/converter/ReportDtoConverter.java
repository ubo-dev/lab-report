package com.ubo.labreport.dto.converter;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.model.Report;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReportDtoConverter {

    public ReportDto convert(Report from) {
        return new ReportDto(
                from.getId(),
                from.getPatientFirstName(),
                from.getPatientLastName(),
                from.getIdentityNumber(),
                from.getDiagnosis(),
                from.getDiagnosisDetails(),
                from.getGivenDate()
        );
    }

    public List<ReportDto> convertList(List<Report> from) {
        return from.stream().map(this::convert).collect(Collectors.toList());
    }
}
