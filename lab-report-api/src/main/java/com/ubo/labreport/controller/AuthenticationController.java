package com.ubo.labreport.controller;

import com.ubo.labreport.dto.AuthenticationRequest;
import com.ubo.labreport.dto.AuthenticationResponse;
import com.ubo.labreport.dto.RegisterRequest;
import com.ubo.labreport.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    // Endpoint for user registration.
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request // The registration request data.
    ) {
        return ResponseEntity.ok(authenticationService.register(request)); // Returns a response entity with the registration result.
    }

    // Endpoint for user authentication.
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request // The authentication request data.
    ) {
        return ResponseEntity.ok(authenticationService.login(request)); // Returns a response entity with the authentication result.
    }

    // Endpoint for refreshing authentication tokens.
    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request, // The HTTP request.
            HttpServletResponse response // The HTTP response.
    ) throws IOException {
        authenticationService.refreshToken(request, response); // Refreshes the authentication token.
    }

}
