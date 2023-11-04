package com.ubo.labreport.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "t_laborant")
public class Laborant {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    private String firstName;
    private String lastName;

    @Size(min = 7, max = 7, message = "Hospital ID must be 7 digits long")
    private String hospitalId;

    @OneToMany(mappedBy = "laborant", fetch = FetchType.EAGER)
    private List<Report> reports;
}
