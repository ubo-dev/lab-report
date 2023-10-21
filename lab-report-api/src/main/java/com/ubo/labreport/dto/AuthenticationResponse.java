package com.ubo.labreport.dto;

public class AuthenticationResponse {

    private String token;

    public AuthenticationResponse(String jwtToken) {
        this.token = jwtToken;
    }

    public String getToken() {
        return token;
    }
}
