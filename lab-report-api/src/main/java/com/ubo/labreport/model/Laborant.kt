package com.ubo.labreport.model

import com.ubo.labreport.enums.Role
import jakarta.persistence.*
import jakarta.validation.constraints.Size
import org.hibernate.annotations.GenericGenerator
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

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
    val reports: List<Report>?,

    @Enumerated
    val role: Role?

) : UserDetails

{
    constructor(firstName: String, lastName: String, hospitalId: String) : this(
        "",
        firstName = firstName,
        lastName = lastName,
        hospitalId = hospitalId,
        null,
        null
    )

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val authorities = ArrayList<SimpleGrantedAuthority>();
        authorities.add(SimpleGrantedAuthority(role?.name));
        return authorities;
    }

    override fun getPassword(): String {
        TODO("Not yet implemented")
    }

    override fun getUsername(): String {
        return firstName + lastName;
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


