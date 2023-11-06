package com.example.labreport.service;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.converter.LaborantDtoConverter;
import com.ubo.labreport.dto.converter.ReportDtoConverter;
import com.ubo.labreport.exception.LaborantNotFoundException;
import com.ubo.labreport.exception.ReportNotFoundException;
import com.ubo.labreport.model.ImageData;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.model.Report;
import com.ubo.labreport.repository.LaborantRepository;
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

public class LaborantServiceTest {

    private LaborantRepository laborantRepository;
    private LaborantDtoConverter laborantDtoConverter;
    private LaborantService laborantService;


    @BeforeEach
    public void setUp() {
        laborantRepository = mock(LaborantRepository.class);
        laborantDtoConverter = mock(LaborantDtoConverter.class);
        laborantService = new LaborantService(laborantRepository,laborantDtoConverter);
    }

    @Test
    public void testFindByLaborantId_whenLaborantIdExists_shouldReturnLaborant() {
        UUID id = UUID.randomUUID();
        Laborant laborant = new Laborant(id,"first-name","last-name","1234567", List.of());

        Mockito.when(laborantRepository.findById(id)).thenReturn(Optional.of(laborant));

        Laborant result = laborantRepository.findById(id).orElseThrow(() -> new LaborantNotFoundException("laborant not found"));

        assertEquals(result,laborant);
    }

    @Test
    public void testFindByLaborantId_whenLaborantIdDoesNotExists_shouldThrowLaborantNotFound() {
        UUID id = UUID.randomUUID();
        Mockito.when(laborantRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(ReportNotFoundException.class, () -> laborantRepository.findById(id).get());
    }

    @Test
    public void testFindByLaborantName_whenLaborantIdExists_shouldReturnLaborant() {
        UUID id = UUID.randomUUID();
        Laborant laborant = new Laborant(id,"first-name","last-name","1234567", List.of());

        Mockito.when(laborantService.getLaborantByName(laborant.getFirstName(),laborant.getLastName())).thenReturn(laborantDtoConverter.convert(laborant));

        Laborant result = laborantRepository.findById(id).orElseThrow(() -> new LaborantNotFoundException("laborant not found"));

        assertEquals(result,laborant);
    }

    @Test
    public void testFindByLaborantName_whenLaborantIdDoesNotExists_shouldThrowLaborantNotFound() {
        UUID id = UUID.randomUUID();
        Laborant laborant = laborantRepository.findById(id).get();
        Mockito.when(laborantService.getLaborantByName(laborant.getFirstName(),laborant.getLastName())).thenReturn(null);
        assertThrows(ReportNotFoundException.class, () -> laborantRepository.findById(id).get());
    }

}
