package com.ubo.labreport.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "t_report")
public class Report {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    private String patientFirstName;
    private String patientLastName;
    private String identityNumber;
    private String diagnosis;
    private String diagnosisDetails;
    private LocalDateTime givenDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "laborant_id", nullable = false)
    private Laborant laborant;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "image_id")
    private ImageData image;
}
