package com.ubo.labreport.service;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.ReportRequest;
import com.ubo.labreport.dto.converter.LaborantDtoConverter;
import com.ubo.labreport.dto.converter.ReportDtoConverter;
import com.ubo.labreport.exception.ReportNotFoundException;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.model.Report;
import com.ubo.labreport.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportDtoConverter converter;

    public ReportService(@Qualifier("report") ReportRepository reportRepository,
                         ReportDtoConverter reportDtoConverter) {
        this.reportRepository = reportRepository;
        this.converter = reportDtoConverter;
    }


    public ReportDto createReport(ReportRequest request) {
        return converter.convert(reportRepository.save(new Report(
                request.patientFirstName(),
                request.patientLastName(),
                request.identityNumber(),
                request.diagnosis(),
                request.diagnosisDetails(),
                new Laborant(
                        request.laborant().firstName(),
                        request.laborant().lastName(),
                        request.laborant().hospitalId()
                )
        )));
    }

    public List<ReportDto> getAllReport() {
        return converter.convertList(reportRepository.findAll());
    }

    public ReportDto getReportById(String id) {
        return converter.convert(findReportById(id));
    }

    protected Report findReportById(String id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new ReportNotFoundException("Report not found with id :" + id));
    }

    public ReportDto updateReport(String id, ReportRequest request) {
        return converter.convert(reportRepository.save(new Report(
                id,
                request.patientFirstName(),
                request.patientLastName(),
                request.identityNumber(),
                request.diagnosis(),
                request.diagnosisDetails(),
                new Laborant(
                        request.laborant().firstName(),
                        request.laborant().lastName(),
                        request.laborant().hospitalId()
                )
        )));
    }

    public ReportDto deleteReport(String id) {
        Report report = findReportById(id);
        reportRepository.deleteById(id);

        return converter.convert(report);
    }

    public List<ReportDto> getAllReportByGivenDate() {
        return converter.convertList(reportRepository.findAllByOrderByGivenDateDesc());
    }

    public ReportDto getReportByPatientName(String firstName, String lastName) {
        return converter.convert(reportRepository.getReportByPatientFirstNameAndPatientLastName(firstName,lastName));
    }

    public ReportDto getReportByIdentityNumber(String id) {
        return converter.convert(reportRepository.getReportByIdentityNumber(id));
    }

}
