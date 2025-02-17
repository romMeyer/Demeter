package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.AuthRequest;
import fr.finkit.demeter.dto.LoginResponse;
import fr.finkit.demeter.dto.LoginUserDto;
import fr.finkit.demeter.dto.RegisterUserDto;
import fr.finkit.demeter.entity.Role;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.repository.UserRepository;
import fr.finkit.demeter.service.AuthenticationService;
import fr.finkit.demeter.service.JwtService;
import fr.finkit.demeter.service.RoleService;
import fr.finkit.demeter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }
}

