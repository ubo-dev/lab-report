package com.ubo.labreport.controller;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.LaborantRequest;
import com.ubo.labreport.service.LaborantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/laborant")
public class LaborantController {

    private final LaborantService laborantService;

    public LaborantController(LaborantService laborantService) {
        this.laborantService = laborantService;
    }

    @PostMapping()
    public ResponseEntity<LaborantDto> createLaborant(@RequestBody @Valid LaborantRequest request) {
        return ResponseEntity.ok(laborantService.createLaborant(request));
    }

    @GetMapping("/{firstName}-{lastName}")
    public ResponseEntity<LaborantDto> getLaborantByName(@PathVariable String firstName, @PathVariable String lastName) {
        return ResponseEntity.ok(laborantService.getLaborantByName(firstName, lastName));
    }

    @GetMapping()
    public ResponseEntity<List<LaborantDto>> getAllLaborant() {
        return ResponseEntity.ok(laborantService.getAllLaborant());
    }

}
