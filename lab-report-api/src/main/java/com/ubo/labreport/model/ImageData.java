package com.ubo.labreport.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_imageData")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] dataOfImage;

    @OneToOne(mappedBy = "image")
    private Report report;

}
