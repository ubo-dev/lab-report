package com.ubo.labreport.service;

import com.ubo.labreport.model.Token;
import com.ubo.labreport.model.User;
import com.ubo.labreport.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TokenService {

    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository repository) {
        this.tokenRepository = repository;
    }

    public Token saveToken(Token token) {
        return tokenRepository.save(token);
    }

    public List<Token> findAllValidTokensByUser(User user) {
        return tokenRepository.findAllValidTokensByUser(user.getId());
    }

    public List<Token> saveAll(List<Token> tokens) {
        return tokenRepository.saveAll(tokens);
    }

    public Optional<Token> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
