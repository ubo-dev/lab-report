package com.ubo.labreport.security;

import com.ubo.labreport.enums.Role;
import jakarta.validation.constraints.NotBlank;
import org.jetbrains.annotations.NotNull;

import java.util.Objects;

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

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        if(Objects.equals(this.role, "ADMIN")) {
            return Role.ADMIN;
        }

        return Role.USER;
    }
}

