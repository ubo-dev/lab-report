package com.ubo.labreport.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import org.hibernate.annotations.GenericGenerator
import java.time.LocalDateTime

@Entity
data class Report(

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: String,
    val patientFirstName: String,
    val patientLastName: String,
    val identityNumber: String,
    val diagnosis: String,
    val diagnosisDetails: String,
    val givenDate: LocalDateTime

) {

    constructor(patientFirstName: String,patientLastName: String,identityNumber: String,diagnosis: String,
        diagnosisDetails: String) : this(
            "",
            patientFirstName = patientFirstName,
            patientLastName = patientLastName,
            identityNumber = identityNumber,
            diagnosis = diagnosis,
            diagnosisDetails = diagnosisDetails,
            LocalDateTime.now()
        )
}

