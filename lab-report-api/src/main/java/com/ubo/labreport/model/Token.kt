package com.ubo.labreport.model

import com.ubo.labreport.enums.TokenType
import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator

@Entity
data class Token(

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id : String,

    @Column(unique = true)
    val token: String,

    @Enumerated(EnumType.STRING)
    val tokenType: TokenType = TokenType.BEARER,
    var expired: Boolean,
    var revoked: Boolean,

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
) {

  constructor(token: String, tokenType: TokenType, expired: Boolean, revoked: Boolean, user: User) : this(
      "",
      token = token,
      tokenType = tokenType,
      expired = expired,
      revoked = revoked,
      user = user
  )
}


