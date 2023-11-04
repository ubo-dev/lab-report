package com.ubo.labreport.repository;

import com.ubo.labreport.model.Laborant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface LaborantRepository extends JpaRepository<Laborant, UUID> {

    Laborant getLaborantByFirstNameAndLastName(String firstName, String lastName);
}
