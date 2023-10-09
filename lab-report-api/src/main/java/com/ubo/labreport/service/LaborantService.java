package com.ubo.labreport.service;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.dto.LaborantRequest;
import com.ubo.labreport.dto.converter.LaborantDtoConverter;
import com.ubo.labreport.model.Laborant;
import com.ubo.labreport.repository.LaborantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaborantService {

    private final LaborantRepository laborantRepository;
    private final LaborantDtoConverter converter;


    public LaborantService(LaborantRepository laborantRepository, LaborantDtoConverter laborantDtoConverter) {
        this.laborantRepository = laborantRepository;
        this. converter = laborantDtoConverter;
    }

    public LaborantDto createLaborant(LaborantRequest request) {
       return converter.convert(laborantRepository.save(new Laborant(
               request.firstName(),
               request.lastName(),
               request.hospitalId()
       )));
    }

    public LaborantDto getLaborantByName(String firstName, String lastName) {
        return converter.convert(laborantRepository.getLaborantByFirstNameAndLastName(firstName, lastName));
    }

    public List<LaborantDto> getAllLaborant() {
        return converter.convertList(laborantRepository.findAll());
    }


}
