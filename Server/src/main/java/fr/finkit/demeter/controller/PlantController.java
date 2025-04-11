package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.dto.PlantUserDto;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.PlantUser;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.mapper.PlantMapper;
import fr.finkit.demeter.mapper.PlantUserMapper;
import fr.finkit.demeter.service.PlantService;
import fr.finkit.demeter.service.PlantUserService;
import fr.finkit.demeter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantUserService plantUserService;

    @Autowired
    private PlantMapper plantMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private PlantUserMapper plantUserMapper;


    @PostMapping
    public ResponseEntity<PlantDto> createPlant(@RequestBody PlantDto PlantDto) {
        PlantDto plantDto = plantMapper.toDto(plantService.savePlant(plantMapper.toEntity(PlantDto)));
        return new ResponseEntity<>(plantDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        User user = userService.getCurrentUser();
        if(user.getId() == null || !Objects.equals(user.getRole().getName(), "ADMIN")) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (plantService.getPlantById(id).isPresent()) {
            plantService.deletePlant(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/user")
    public ResponseEntity<List<PlantUserDto>> getPlantsByUser() {
        User user = userService.getCurrentUser();
        if(user.getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<PlantUser> plantUserList = plantUserService.findAllByUserId(user.getId());
        List<PlantUserDto> plantUserDtoList = plantUserList.stream().map(plantUserMapper::toDto).toList();
        return ResponseEntity.ok(plantUserDtoList);
    }

    @GetMapping("/user/notice")
    public ResponseEntity<Boolean> showPlantUserNeedWatering() {
        User user = userService.getCurrentUser();
        if(user.getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return ResponseEntity.ok(plantUserService.isPlantUserNeedWateringByUserId(user.getId()));
    }

    @PostMapping("/user")
    public ResponseEntity<PlantUserDto> addPlantForUser(@RequestBody Long plantId) {
        User user = userService.getCurrentUser();
        if(user.getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Plant plant = plantService.getPlantById(plantId).orElse(null);
        if(plant == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        PlantUser plantReturn = plantUserService.savePlantUser(plant, user);
        PlantUserDto plantReturnDto = plantUserMapper.toDto(plantReturn);
        return ResponseEntity.status(HttpStatus.CREATED).body(plantReturnDto);
    }

    @PatchMapping("/user")
    public ResponseEntity<PlantUserDto> waterPlant(@RequestBody Long plantId) {
        User user = userService.getCurrentUser();
        if(user.getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Plant plant = plantService.getPlantById(plantId).orElse(null);
        if(plant == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();


        PlantUser plantReturn = plantUserService.waterPlant(plant, user);
        PlantUserDto plantReturnDto = plantUserMapper.toDto(plantReturn);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(plantReturnDto);
    }

    @DeleteMapping("/user/{plantId}")
    public ResponseEntity<Void> deletePlantUser(@PathVariable Long plantId) {
        User user = userService.getCurrentUser();
        if(user.getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Plant plant = plantService.getPlantById(plantId).orElse(null);
        if(plant == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        PlantUser plantUser = plantUserService.findByUserIdAndPlantId(plant, user);
        if(plantUser == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        plantUserService.deleteByPlantUser(plantUser);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
