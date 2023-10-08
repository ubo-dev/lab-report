package com.ubo.labreport.service;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.ReportRequest;
import com.ubo.labreport.dto.converter.ReportDtoConverter;
import com.ubo.labreport.exception.ReportNotFoundException;
import com.ubo.labreport.model.Report;
import com.ubo.labreport.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportDtoConverter converter;

    public ReportService(ReportRepository reportRepository, ReportDtoConverter reportDtoConverter) {
        this.reportRepository = reportRepository;
        this.converter = reportDtoConverter;
    }


    public ReportDto createReport(ReportRequest request) {
        return converter.convert(reportRepository.save(new Report(
                request.firstName(),
                request.lastName(),
                request.identityNumber(),
                request.diagnosis(),
                request.diagnosisDetails()
        )));
    }

    public List<ReportDto> getAllReport() {
        return converter.convertList(reportRepository.findAll());
    }

    public ReportDto getReportById(String id) {
        return converter.convert(reportRepository.findById(id).orElseThrow(
                () -> new ReportNotFoundException("Report not found with id: " + id)));
    }

    public ReportDto updateReport(String id, ReportRequest request) {
        ReportDto report = getReportById(id);
        return converter.convert(reportRepository.save(new Report(
                report.id(),
                request.firstName(),
                request.lastName(),
                request.identityNumber(),
                request.diagnosisDetails()
        )));
    }

}
