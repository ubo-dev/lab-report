package com.ubo.labreport.dto;

import com.ubo.labreport.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;
    @NotBlank
    private String password;

    @NotBlank
    private String role;


    public Role getRole() {
        if(Objects.equals(this.role, "ADMIN")) {
            return Role.ADMIN;
        }

        return Role.USER;
    }
}

