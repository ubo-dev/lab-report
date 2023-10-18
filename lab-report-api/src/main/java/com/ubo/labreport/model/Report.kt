package com.ubo.labreport.model

import jakarta.persistence.*
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
    val givenDate: LocalDateTime,

    @ManyToOne(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinColumn(name = "laborant_id", nullable = false)
    val laborant: Laborant

) {


    constructor(patientFirstName: String,patientLastName: String,identityNumber: String,diagnosis: String,
                diagnosisDetails: String,laborant: Laborant) : this(
        "",
        patientFirstName = patientFirstName,
        patientLastName = patientLastName,
        identityNumber = identityNumber,
        diagnosis = diagnosis,
        diagnosisDetails = diagnosisDetails,
        LocalDateTime.now(),
        laborant = laborant
    )

    constructor(id: String,patientFirstName: String,patientLastName: String,identityNumber: String,diagnosis: String,
                diagnosisDetails: String,laborant: Laborant) : this(
        "",
        patientFirstName = patientFirstName,
        patientLastName = patientLastName,
        identityNumber = identityNumber,
        diagnosis = diagnosis,
        diagnosisDetails = diagnosisDetails,
        LocalDateTime.now(),
        laborant = laborant
    )


}

