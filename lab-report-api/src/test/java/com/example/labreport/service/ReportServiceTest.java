package com.example.labreport.service;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.converter.ReportDtoConverter;
import com.ubo.labreport.exception.ReportNotFoundException;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.model.Report;
import com.ubo.labreport.repository.ReportRepository;
import com.ubo.labreport.service.LaborantService;
import com.ubo.labreport.service.ReportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

public class ReportServiceTest {

    private ReportService reportService;
    private ReportRepository reportRepository;
    private ReportDtoConverter reportDtoConverter;
    private LaborantService laborantService;


    @BeforeEach
    public void setUp() {
        reportRepository = mock(ReportRepository.class);
        reportDtoConverter = mock(ReportDtoConverter.class);
        laborantService = mock(LaborantService.class);
        reportService = new ReportService(reportRepository,reportDtoConverter,laborantService);
    }

    @Test
    public void testFindByReportId_whenReportIdExists_shouldReturnReport() {
        UUID id = UUID.randomUUID();
        Report report = new Report(id,"patientFirstName","patientLastName","identityNumber"
                ,"diagnosis","diagnosisDetails", LocalDateTime.now(), new Laborant());

        Mockito.when(reportRepository.findById(id)).thenReturn(Optional.of(report));

        Report result = reportRepository.findById(id).orElseThrow(() -> new ReportNotFoundException("report not found"));

        assertEquals(result,report);
    }

    @Test
    public void testFindByReportId_whenReportIdDoesNotExists_shouldThrowReportNotFound() {
        UUID id = UUID.randomUUID();
        Mockito.when(reportRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(ReportNotFoundException.class, () -> reportRepository.findById(id).get());
    }

    @Test
    public void testGetReportById_whenReportIdExists_shouldReturnReport() {
        UUID id = UUID.randomUUID();
        Report report = new Report(id,"name","surname"
                ,"identity number","diagnosis","diagnosis details"
                ,LocalDateTime.now(), new Laborant());
        ReportDto reportDto = new ReportDto(id,"name","surname"
                ,"identity number","diagnosis","diagnosis details"
                ,LocalDateTime.now());

        Mockito.when(reportRepository.findById(id)).thenReturn(Optional.of(report));
        Mockito.when(reportDtoConverter.convert(report)).thenReturn(reportDto);

        ReportDto result = reportService.getReportById(id);

        assertEquals(result,reportDto);
    }

    @Test
    public void testGetReportById_whenReportIdDoesNotExists_shouldThrowReportNotFoundException() {
        UUID id = UUID.randomUUID();

        Mockito.when(reportRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ReportNotFoundException.class, () -> reportRepository.findById(id));

        Mockito.verifyNoInteractions(reportDtoConverter);
    }


}
