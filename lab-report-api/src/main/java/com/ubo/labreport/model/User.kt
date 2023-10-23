package com.ubo.labreport.model

import com.ubo.labreport.enums.Role
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import org.hibernate.annotations.GenericGenerator
import org.jetbrains.annotations.NotNull
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
data class User(

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    private val password: String,

    @Enumerated(EnumType.STRING)
    val role: Role,

    @OneToMany(mappedBy = "user")
    val tokens: List<Token>?

) : UserDetails {
    constructor(firstName: String, lastName: String, email: String, password: String,
                role: Role, tokens: List<Token>?) : this(
        "",
        firstName = firstName,
        lastName = lastName,
        email = email,
        password = password,
        role = role,
        tokens = tokens
    ) {

    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val authorities = ArrayList<SimpleGrantedAuthority>();
        authorities.add(SimpleGrantedAuthority(role.name))
        return authorities;
    }

    override fun getPassword(): String {
        return password;
    }

    override fun getUsername(): String {
        return email;
    }

    override fun isAccountNonExpired(): Boolean {
        return true;
    }

    override fun isAccountNonLocked(): Boolean {
        return true;
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true;
    }

    override fun isEnabled(): Boolean {
        return true;
    }

}
