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
        List<User> userList = userService.getAllUsers();
        List<UserDto> userDtoList = userList.stream().map(userMapper::toDto).toList();
        return ResponseEntity.ok(userDtoList);
    }

    @PostMapping("/user")
    public ResponseEntity<UserDto> editUser(@RequestBody UserDto userDto) {
        try {
            User user = userMapper.toEntity(userDto);
            User saved = userService.saveUser(user);
            System.out.println(saved);
            return ResponseEntity.ok(userMapper.toDto(saved));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
