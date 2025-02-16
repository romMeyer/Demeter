package fr.finkit.demeter.controller;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    @Autowired
    private final PlantService plantService;

    public PlantController(PlantService PlantService) {
        this.plantService = PlantService;
    }

    @GetMapping
    public List<Plant> getAllPlants() {
        return plantService.getAllPlants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable Long id) {
        return plantService.getPlantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Plant createPlant(@RequestBody Plant Plant) {
        return plantService.savePlant(Plant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        if (plantService.getPlantById(id).isPresent()) {
            plantService.deletePlant(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
