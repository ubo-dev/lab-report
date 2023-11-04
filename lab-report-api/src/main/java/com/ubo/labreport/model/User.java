package com.ubo.labreport.model;

import com.ubo.labreport.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "t_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities(); // Returns the authorities (permissions) associated with the user's role.
    }

    @Override
    public String getPassword() {
        return password; // Returns the user's password.
    }

    @Override
    public String getUsername() {
        return email; // Returns the user's email as their username.
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Indicates if the user's account is not expired (always true).
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Indicates if the user's account is not locked (always true).
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Indicates if the user's credentials are not expired (always true).
    }

    @Override
    public boolean isEnabled() {
        return true; // Indicates if the user is enabled and can log in (always true).
    }
}
