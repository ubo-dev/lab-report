package com.ubo.labreport.config;

import com.ubo.labreport.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.ubo.labreport.enums.Permission.*;
import static com.ubo.labreport.enums.Role.ADMIN;
import static com.ubo.labreport.enums.Role.USER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    // Beyaz liste URL'leri: Kimlik doğrulamasının gerekli olmadığı URL'leri tanımlar
    private static final String[] WHITE_LIST_URL = {
            "/api/auth/register",                 // Kullanıcı kaydı için izin verilen URL
            "/api/auth/login",            // Kimlik doğrulama için izin verilen URL
            "/api/auth/refresh-token",           // Yenileme belirteci için izin verilen URL
            "/v2/api-docs",                      // Swagger belgeleri için URL
            "/v3/api-docs",                      // Swagger belgeleri için URL
            "/v3/api-docs/**",                   // Swagger belgeleri için URL
            "/swagger-resources",                // Swagger kaynakları için URL
            "/swagger-resources/**",             // Swagger kaynakları için URL
            "/configuration/ui",                 // Swagger konfigürasyonu için URL
            "/configuration/security",           // Swagger güvenlik konfigürasyonu için URL
            "/swagger-ui/**",                    // Swagger UI için URL
            "/webjars/**",                       // Webjars kaynakları için URL
            "/swagger-ui.html"                   // Swagger UI için HTML URL
    };

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        request -> request.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/laborant/**").hasAnyRole(ADMIN.name(), USER.name())
                                .requestMatchers(GET, "/api/laborant/**").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name())
                                .requestMatchers(POST, "api/laborant/**").hasAuthority(ADMIN_CREATE.name())

                                .requestMatchers("/api/report/**").hasAnyRole(ADMIN.name(), USER.name())
                                .requestMatchers(GET, "/api/report/**").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name())
                                .requestMatchers(POST, "/api/report/**").hasAuthority(ADMIN_CREATE.name())
                                .requestMatchers(PUT, "/api/report/**").hasAuthority(ADMIN_UPDATE.name())
                                .requestMatchers(DELETE, "/api/report/**").hasAuthority(ADMIN_UPDATE.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                                logout.logoutUrl("/api/auth/logout")
                                        .addLogoutHandler(logoutHandler)
                                        .logoutSuccessHandler(
                                                ((request, response, authentication) -> SecurityContextHolder.clearContext())
                                        )
                );
        return http.build();
    }
}