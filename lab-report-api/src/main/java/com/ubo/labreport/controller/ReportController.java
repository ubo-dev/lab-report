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
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping()
    public ResponseEntity<ReportDto> createReport(@RequestBody @Valid ReportRequest request) {
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

    @DeleteMapping("/{id}")
    public ResponseEntity<ReportDto> deleteReportById(@PathVariable String id) {
        return ResponseEntity.ok(reportService.deleteReport(id));
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<ReportDto> updateReportById(@PathVariable String id, @RequestBody @Valid ReportRequest request) {
        return ResponseEntity.ok(reportService.updateReport(id,request));
    }

}
