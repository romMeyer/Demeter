package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.UserDto;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.mapper.UserMapper;
import fr.finkit.demeter.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("api-admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        User user = userService.getCurrentUser();
        if(user.getId() == null || !Objects.equals(user.getRole().getName(), "ADMIN")) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<User> userList = userService.getAllUsers();
        List<UserDto> userDtoList = userList.stream().map(userMapper::toDto).toList();
        return ResponseEntity.ok(userDtoList);
    }

}
