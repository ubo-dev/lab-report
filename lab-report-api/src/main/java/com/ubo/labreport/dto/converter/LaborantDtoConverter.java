package com.ubo.labreport.dto.converter;

import com.ubo.labreport.dto.LaborantDto;
import com.ubo.labreport.model.Laborant;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LaborantDtoConverter {

    public LaborantDto convert(Laborant laborant) {
        return new LaborantDto(
                laborant.getId(),
                laborant.getFirstName(),
                laborant.getLastName(),
                laborant.getHospitalId(),
                laborant.getReports()
        );
    }

    public List<LaborantDto> convertList(List<Laborant> laborant) {
        return laborant.stream().map(this::convert).collect(Collectors.toList());
    }

}
