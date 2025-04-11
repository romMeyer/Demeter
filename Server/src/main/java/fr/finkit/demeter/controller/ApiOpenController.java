package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.PlantCatalogueDto;
import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.dto.RecetteDto;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.Recette;
import fr.finkit.demeter.mapper.PlantMapper;
import fr.finkit.demeter.mapper.RecetteMapper;
import fr.finkit.demeter.service.PlantService;
import fr.finkit.demeter.service.RecetteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("api-open")
public class ApiOpenController {

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantMapper plantMapper;
    @Autowired
    private RecetteService recetteService;
    @Autowired
    private RecetteMapper recetteMapper;

    @GetMapping("/plants")
    public ResponseEntity<List<PlantCatalogueDto>> getAllPlants() {
        List<Plant> plantList = plantService.getAllPlants();
        List<PlantCatalogueDto> plantCatalogueDtoList = plantList.stream().map(plantMapper::toCatalogueDto).toList();
        return ResponseEntity.ok(plantCatalogueDtoList);
    }

    @GetMapping("/plants/{id}")
    public ResponseEntity<PlantDto> getPlantById(@PathVariable Long id) {
        PlantDto plantDto = plantMapper.toDto(plantService.getPlantDetailById(id));
        if(plantDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(plantDto);

    }

    @GetMapping("/recettes/{idPlant}")
    public ResponseEntity<List<RecetteDto>> getAllRecette(@PathVariable Long idPlant) {
        Set<Recette> recetteList = recetteService.findAllByPlantId(idPlant);
        List<RecetteDto> recetteDtoList = recetteList.stream().map(recetteMapper::toDto).toList();
        return ResponseEntity.ok(recetteDtoList);
    }
}
