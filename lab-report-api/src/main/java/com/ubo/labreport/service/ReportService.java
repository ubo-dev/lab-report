package com.ubo.labreport.service;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.ReportRequest;
import com.ubo.labreport.dto.converter.LaborantDtoConverter;
import com.ubo.labreport.dto.converter.ReportDtoConverter;
import com.ubo.labreport.exception.ReportNotFoundException;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.model.Report;
import com.ubo.labreport.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportDtoConverter converter;
    private final LaborantService laborantService;

    public ReportDto createReport(ReportRequest request) {
        LaborantDto laborant = laborantService.getLaborantById(request.laborantId());

        return converter.convert(
                reportRepository.save(
                        Report.builder()
                                .patientFirstName(request.patientFirstName())
                                .patientLastName(request.patientLastName())
                                .identityNumber(request.identityNumber())
                                .diagnosis(request.diagnosis())
                                .diagnosisDetails(request.diagnosisDetails())
                                .givenDate(LocalDateTime.now())
                                .laborant(
                                        Laborant.builder()
                                                .firstName(laborant.firstName())
                                                .lastName(laborant.lastName())
                                                .hospitalId(laborant.hospitalId())
                                                .build()
                                )
                                .build()
                )
        );
    }

    public List<ReportDto> getAllReport() {
        return converter.convertList(reportRepository.findAll());
    }

    public ReportDto getReportById(UUID id) {
        return converter.convert(findReportById(id));
    }

    protected Report findReportById(UUID id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new ReportNotFoundException("Report not found with id :" + id));
    }

    public ReportDto updateReport(UUID id, ReportRequest request) {
        return converter.convert(
                reportRepository.save(
                        Report.builder()
                                .id(id)
                                .patientFirstName(request.patientFirstName())
                                .patientLastName(request.patientLastName())
                                .identityNumber(request.identityNumber())
                                .diagnosis(request.diagnosis())
                                .diagnosisDetails(request.diagnosisDetails())
                                .givenDate(LocalDateTime.now())
                                .build()
                )
        );
    }

    public ReportDto deleteReport(UUID id) {
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
