package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.LoginResponse;
import fr.finkit.demeter.dto.LoginUserDto;
import fr.finkit.demeter.dto.RegisterUserDto;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.error.ErrorResponse;
import fr.finkit.demeter.service.AuthenticationService;
import fr.finkit.demeter.security.JwtService;
import fr.finkit.demeter.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JwtService jwtService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto) {
        log.info("Tentative de connexion pour l'utilisateur : {}", loginUserDto.getUsername());

        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);
            if (jwtToken == null) {
                log.error("Échec de génération du token JWT pour l'utilisateur : {}", loginUserDto.getUsername());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("Erreur interne lors de la génération du token"));
            }

            log.info("Connexion réussie pour l'utilisateur : {}", loginUserDto.getUsername());
            LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
            return ResponseEntity.ok(loginResponse);

        } catch (UsernameNotFoundException ex) {
            log.warn("Utilisateur introuvable : {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Identifiants incorrects"));

        } catch (BadCredentialsException ex) {
            log.warn("Mot de passe incorrect pour l'utilisateur : {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Identifiants incorrects"));

        } catch (DisabledException ex) {
            log.warn("Compte désactivé pour l'utilisateur : {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("Compte désactivé"));

        } catch (AuthenticationException ex) {
            log.error("Échec d'authentification pour l'utilisateur : {} - {}", loginUserDto.getUsername(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Échec de l'authentification"));

        } catch (Exception ex) {
            log.error("Erreur inattendue lors de la connexion de l'utilisateur : {}", loginUserDto.getUsername(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Une erreur est survenue"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        log.info("Tentative d'inscription pour l'utilisateur : {}", registerUserDto.getUsername());

        try {
            if (userService.findByUsername(registerUserDto.getUsername()).isPresent()) {
                log.warn("Tentative d'inscription avec un email déjà utilisé : {}", registerUserDto.getUsername());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("Cet email est déjà utilisé"));
            }

            User authenticatedUser = authenticationService.signup(registerUserDto);
            String jwtToken = jwtService.generateToken(authenticatedUser);

            log.info("Inscription réussie pour l'utilisateur : {}", registerUserDto.getUsername());
            LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
            return ResponseEntity.ok(loginResponse);

        } catch (Exception ex) {
            log.error("Erreur inattendue lors de l'inscription de l'utilisateur : {}", registerUserDto.getUsername(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Une erreur est survenue lors de l'inscription"));
        }
    }
}

