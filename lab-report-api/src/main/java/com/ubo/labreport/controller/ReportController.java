package com.ubo.labreport.controller;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.ReportRequest;
import com.ubo.labreport.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/createReport")
    public ResponseEntity<ReportDto> createReport(@RequestBody @Valid ReportRequest request) {
        return ResponseEntity.ok(reportService.createReport(request));
    }

    @GetMapping("/getAllReport")
    public ResponseEntity<List<ReportDto>> getAllReport() {
        return ResponseEntity.ok(reportService.getAllReport());
    }

    @GetMapping("/getReportById/{id}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable UUID id) {
        return ResponseEntity.ok(reportService.getReportById(id));
    }

    @GetMapping("/getAllReportsByDate")
    public ResponseEntity<List<ReportDto>> getAllByDate() {
        return ResponseEntity.ok(reportService.getAllReportByGivenDate());

    }
    @GetMapping("/getReportByIdentityNumber/{id}")
    public ResponseEntity<ReportDto> getReportByIdentityNumber(@PathVariable String id) {
        return ResponseEntity.ok(reportService.getReportByIdentityNumber(id));
    }

    @GetMapping("/getReportByName/{firstName}-{lastName}")
    public ResponseEntity<ReportDto> getReportByPatientName(@PathVariable String firstName,
                                                            @PathVariable String lastName) {
        return ResponseEntity.ok(reportService.getReportByPatientName(firstName,lastName));
    }

    @DeleteMapping("/deleteReportById/{id}")
    public ResponseEntity<ReportDto> deleteReportById(@PathVariable UUID id) {
        return ResponseEntity.ok(reportService.deleteReport(id));
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<ReportDto> updateReportById(@PathVariable UUID id,
                                                      @RequestBody @Valid ReportRequest request) {
        return ResponseEntity.ok(reportService.updateReport(id,request));
    }

}
