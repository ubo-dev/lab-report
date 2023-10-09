package com.ubo.labreport.model

import jakarta.persistence.*
import jakarta.validation.constraints.Size
import org.hibernate.annotations.GenericGenerator

@Entity
data class Laborant(

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: String,
    val firstName: String,
    val lastName: String,

    @Size(min = 7, max = 7, message = "Hospital ID must be 7 digits long")
    val hospitalId: String,

    @OneToMany(mappedBy = "laborant", fetch = FetchType.EAGER)
    val reports: List<Report>?
) {
    constructor(firstName: String, lastName: String, hospitalId: String) : this(
        "",
        firstName = firstName,
        lastName = lastName,
        hospitalId = hospitalId,
        null
    )
}
