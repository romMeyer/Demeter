package fr.finkit.demeter.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final HandlerExceptionResolver handlerExceptionResolver;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService,
            HandlerExceptionResolver handlerExceptionResolver
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String requestURI = request.getRequestURI();
        final String method = request.getMethod();

        log.debug("JwtAuthenticationFilter - {} {} - Authorization header present: {}",
                method, requestURI, authHeader != null);

        // Ne jamais intercepter les préflight CORS
        if ("OPTIONS".equalsIgnoreCase(method)) {
            log.debug("Requête OPTIONS (preflight) ignorée pour {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        if (requestURI.startsWith("/api-open") || requestURI.startsWith("/api/auth")) {
            log.debug("Route publique détectée, filtre JWT ignoré pour {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.debug("Pas de token Bearer présent pour {}, passage sans authentification", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(jwt);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (userEmail != null && authentication == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                List<GrantedAuthority> authorities = new ArrayList<>();
                String role = jwtService.extractRole(jwt);

                if (role != null) {
                    authorities.add(new SimpleGrantedAuthority(role));
                }

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            authorities
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("Authentification JWT réussie pour l'utilisateur : {}", userEmail);
                } else {
                    log.warn("Token JWT invalide pour l'utilisateur : {}", userEmail);
                }
            }

            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            log.warn("Token JWT expiré pour la requête {} {} : {}", method, requestURI, e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Token expired\"}");

        } catch (JwtException e) {
            log.warn("Token JWT invalide ou malformé pour {} {} : {}", method, requestURI, e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Invalid token\"}");

        } catch (Exception exception) {
            log.error("Erreur inattendue dans JwtAuthenticationFilter pour {} {}", method, requestURI, exception);
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    }
}