package com.ubo.labreport.service;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.LaborantRequest;
import com.ubo.labreport.dto.converter.LaborantDtoConverter;
import com.ubo.labreport.exception.LaborantNotFoundException;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.repository.LaborantRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LaborantService {

    private final LaborantRepository laborantRepository;
    private final LaborantDtoConverter converter;


    public LaborantDto createLaborant(@NotNull LaborantRequest request) {
       return converter.convert(
               laborantRepository.save(Laborant.builder()
                       .firstName(request.firstName())
                       .lastName(request.lastName())
                       .hospitalId(request.hospitalId())
                       .reports(List.of())
                       .build())
       );
    }

    public LaborantDto getLaborantByName(String firstName, String lastName) {
        return converter.convert(laborantRepository.getLaborantByFirstNameAndLastName(firstName, lastName));
    }

    public List<LaborantDto> getAllLaborant() {
        return converter.convertList(laborantRepository.findAll());
    }

    public LaborantDto getLaborantById(UUID id) {
        return converter.convert(laborantRepository.findById(id).orElseThrow(
                () -> new LaborantNotFoundException("Laborant not found with id: " + id)));
    }


}
