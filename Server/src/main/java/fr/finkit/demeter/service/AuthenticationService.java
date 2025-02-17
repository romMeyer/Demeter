package fr.finkit.demeter.service;

import fr.finkit.demeter.dto.LoginUserDto;
import fr.finkit.demeter.dto.RegisterUserDto;
import fr.finkit.demeter.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RoleService roleService;


    public User signup(RegisterUserDto registerUserDto) {
        User user = new User(null,
                registerUserDto.getFirstName(),
                registerUserDto.getLastName(),
                registerUserDto.getUsername(),
                roleService.findByName("USER"),
                passwordEncoder.encode(registerUserDto.getPassword()));
        return userService.saveUser(user);
    }

    public User authenticate(LoginUserDto loginUserDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getUsername(),
                        loginUserDto.getPassword()
                )
        );

        return userService.findByUsername(loginUserDto.getUsername())
                .orElseThrow();
    }
}
