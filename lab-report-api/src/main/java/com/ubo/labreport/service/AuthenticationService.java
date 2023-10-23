package com.ubo.labreport.service;

import com.ubo.labreport.enums.TokenType;
import com.ubo.labreport.model.Token;
import com.ubo.labreport.security.JwtService;
import com.ubo.labreport.dto.AuthenticationRequest;
import com.ubo.labreport.dto.AuthenticationResponse;
import com.ubo.labreport.dto.RegisterRequest;
import com.ubo.labreport.model.User;
import com.ubo.labreport.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(jwtToken);
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
        saveUserToken(user,jwtToken);
        return new AuthenticationResponse(
                jwtToken
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
}
