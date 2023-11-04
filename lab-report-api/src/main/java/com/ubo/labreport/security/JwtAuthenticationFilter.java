package com.ubo.labreport.security;

import com.ubo.labreport.repository.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;


    /**
     *
     * @param request HttpServletRequest is a request that we want to intercept and extract data from it
     * @param response is a response that we return after intercepting the request
     * @param filterChain contains list of other filter that is need to be executed
     * @throws ServletException
     * @throws IOException
     */

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("/api/auth/**")) {
            filterChain.doFilter(request, response);
            return;
        }

        // extracting auth header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // if header is null or token is not Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            /**
             *  @filterchain.doFilter() is proceeding to the next element in the chain.
             *  The last element of the chain is the target resource/servlet.
             */
            filterChain.doFilter(request, response);
            return;
        }

        // taking jwt token from auth header
        // begin index is 7 because token starts at index 7: Bearer (jwt token)
        jwt = authHeader.substring(7);
        // extracting mail from jwt token
        userEmail = jwtService.extractUserName(jwt);

        // SecurityContextHolder.getContext().getAuthentication() checks if user authenticated already
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.getExpired() && !t.getRevoked())
                    .orElse(false);
            // isTokenValid checks if jwt token belongs to given user
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                // comes from spring itself
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                // setting user as authenticated with created token
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // handing request to other filters on the chain
        filterChain.doFilter(request, response);
    }
}
