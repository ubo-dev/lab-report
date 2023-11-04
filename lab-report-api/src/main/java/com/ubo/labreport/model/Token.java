package com.ubo.labreport.model;

import com.ubo.labreport.enums.TokenType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "t_token")
public class Token {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(unique = true)
    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType = TokenType.BEARER;
    private Boolean expired;
    private Boolean revoked;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

