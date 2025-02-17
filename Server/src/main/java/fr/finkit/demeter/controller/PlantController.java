package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.mapper.PlantMapper;
import fr.finkit.demeter.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantMapper plantMapper;

    @GetMapping("/{id}")
    public ResponseEntity<PlantDto> getPlantById(@PathVariable Long id) {
        PlantDto plantDto = plantMapper.toDto(plantService.getPlantById(id).orElse(null));
        if(plantDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(plantDto);

    }

    @PostMapping
    public ResponseEntity<PlantDto> createPlant(@RequestBody PlantDto PlantDto) {
        PlantDto plantDto = plantMapper.toDto(plantService.savePlant(plantMapper.toEntity(PlantDto)));
        return new ResponseEntity<>(plantDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        if (plantService.getPlantById(id).isPresent()) {
            plantService.deletePlant(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /*
    @GetMapping("/user")
    public ResponseEntity<List<PlantDto>> getPlantsByUser() {
        Integer userId = userService.getCurrentUser().getId();
        if(userService.getCurrentUser().getId() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        List<Plant> plantList = plantService.findAllByUserId(userId);
        List<PlantDto> plantDtoList = plantList.stream().map(plantMapper::toDto).toList();
        return ResponseEntity.ok(plantDtoList);
    }
    */
}
