package com.ubo.labreport.controller;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.LaborantRequest;
import com.ubo.labreport.service.LaborantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/laborant")
@RequiredArgsConstructor
public class LaborantController {

    private final LaborantService laborantService;

    @PostMapping("/createLaborant")
    public ResponseEntity<LaborantDto> createLaborant(@RequestBody LaborantRequest request) {
        return ResponseEntity.ok(laborantService.createLaborant(request));
    }

    @GetMapping("/getLaborantByName/{firstName}-{lastName}")
    public ResponseEntity<LaborantDto> getLaborantByName(@PathVariable String firstName, @PathVariable String lastName) {
        return ResponseEntity.ok(laborantService.getLaborantByName(firstName, lastName));
    }

    @GetMapping("/getAllLaborant")
    public ResponseEntity<List<LaborantDto>> getAllLaborant() {
        return ResponseEntity.ok(laborantService.getAllLaborant());
    }

    @GetMapping("/getLaborantById/{id}")
    public ResponseEntity<LaborantDto> getLaborantById(@PathVariable UUID id) {
        return ResponseEntity.ok(laborantService.getLaborantById(id));
    }

}
