package com.ubo.labreport.repository;

import com.ubo.labreport.model.Report;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReportRepository extends JpaRepository<Report, UUID> {

    List<Report> findAllByOrderByGivenDateDesc();
    Report getReportByPatientFirstNameAndPatientLastName(String firstName, String lastName);
    Report getReportByIdentityNumber(String identityNumber);
}
