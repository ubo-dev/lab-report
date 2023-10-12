package com.ubo.labreport.repository;

import com.ubo.labreport.model.Laborant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
@Qualifier("laborant")
public interface LaborantRepository extends JpaRepository<Laborant, String> {

    Laborant getLaborantByFirstNameAndLastName(String firstName, String lastName);
}
