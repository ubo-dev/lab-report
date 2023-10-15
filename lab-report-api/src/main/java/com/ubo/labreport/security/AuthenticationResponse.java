package com.ubo.labreport.security;

public class AuthenticationResponse {

    private String token;

    public AuthenticationResponse(String jwtToken) {
        this.token = jwtToken;
    }

    public String getToken() {
        return token;
    }
}
