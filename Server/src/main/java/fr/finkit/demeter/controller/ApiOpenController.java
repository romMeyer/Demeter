package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.mapper.PlantMapper;
import fr.finkit.demeter.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api-open")
public class ApiOpenController {

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantMapper plantMapper;

    @GetMapping("/plants")
    public ResponseEntity<List<PlantDto>> getAllPlants() {
        List<Plant> plantList = plantService.getAllPlants();
        List<PlantDto> plantDtoList = plantList.stream().map(plantMapper::toDto).toList();
        return ResponseEntity.ok(plantDtoList);
    }
}
