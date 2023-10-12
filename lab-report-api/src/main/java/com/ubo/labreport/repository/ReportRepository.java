package com.ubo.labreport.repository;

import com.ubo.labreport.model.Report;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier("report")
public interface ReportRepository extends JpaRepository<Report, String> {

    List<Report> findAllByOrderByGivenDateDesc();
    Report getReportByPatientFirstNameAndPatientLastName(String firstName, String lastName);
    Report getReportByIdentityNumber(String identityNumber);
}
