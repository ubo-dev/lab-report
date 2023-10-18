package com.ubo.labreport.controller;

import com.ubo.labreport.dto.ReportDto;
import com.ubo.labreport.dto.ReportRequest;
import com.ubo.labreport.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/report")
@CrossOrigin(origins = "*",originPatterns = "*/*", allowedHeaders = "*", maxAge = 3600)
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping()
    public ResponseEntity<ReportDto> createReport(@RequestBody @Valid ReportRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(reportService.createReport(request));
    }

    @GetMapping()
    public ResponseEntity<List<ReportDto>> getAllReport() {
        return ResponseEntity.ok(reportService.getAllReport());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable String id) {
        return ResponseEntity.ok(reportService.getReportById(id));
    }

    @GetMapping("/getAllByDate")
    public ResponseEntity<List<ReportDto>> getAllByDate() {
        return ResponseEntity.ok(reportService.getAllReportByGivenDate());

    }
    @GetMapping("/getReportByIdentityNumber/{id}")
    public ResponseEntity<ReportDto> getReportByIdentityNumber(@PathVariable String id) {
        return ResponseEntity.ok(reportService.getReportByIdentityNumber(id));
    }

    @GetMapping("/{firstName}-{lastName}")
    public ResponseEntity<ReportDto> getReportByPatientName(@PathVariable String firstName,
                                                            @PathVariable String lastName) {
        return ResponseEntity.ok(reportService.getReportByPatientName(firstName,lastName));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReportDto> deleteReportById(@PathVariable String id) {
        return ResponseEntity.ok(reportService.deleteReport(id));
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<ReportDto> updateReportById(@PathVariable String id,
                                                      @RequestBody @Valid ReportRequest request) {
        return ResponseEntity.ok(reportService.updateReport(id,request));
    }

}
