package com.ubo.labreport.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ubo.labreport.enums.TokenType;
import com.ubo.labreport.model.Token;
import com.ubo.labreport.security.JwtService;
import com.ubo.labreport.dto.AuthenticationRequest;
import com.ubo.labreport.dto.AuthenticationResponse;
import com.ubo.labreport.dto.RegisterRequest;
import com.ubo.labreport.model.User;
import com.ubo.labreport.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    public AuthenticationResponse register(RegisterRequest request) {
        var user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole(),
                null
        );
        userRepository.save(user);
        revokeAllTokensByUser(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(
                jwtToken,
                refreshToken
        );
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        revokeAllTokensByUser(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user,jwtToken);
        return new AuthenticationResponse(
                jwtToken,
                refreshToken
        );
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = new Token(
                jwtToken,
                TokenType.BEARER,
                false,
                false,
                user
        );
        tokenService.saveToken(token);
    }

    private void revokeAllTokensByUser(User user) {
        var validUserTokens = tokenService.findAllValidTokensByUser(user);
        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach( token -> {
                token.setRevoked(true);
                token.setExpired(true);
            }
        );
        tokenService.saveAll(validUserTokens);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // extracting auth header
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        // if header is null or token is not Bearer
        if (authHeader == null || !(authHeader.startsWith("Bearer "))) {
            return;
        }

        // taking jwt token from auth header
        // begin index is 7 because token starts at index 7: Bearer (jwt token)
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserName(refreshToken);
        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllTokensByUser(user);
                saveUserToken(user, accessToken);
                var authResponse = new AuthenticationResponse(
                        accessToken,
                        refreshToken
                );
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
