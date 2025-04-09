package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.Recette;
import fr.finkit.demeter.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;
import java.util.Set;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private RecetteService recetteService;

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public Optional<Plant> getPlantById(Long id) {
        return plantRepository.findById(id);
    }

    public Plant savePlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }

    public List<Plant> findAllByUserId(Long userId) {
        return plantRepository.findAllByUserId(userId);
    }

    public Plant getPlantDetailById(Long id) {
        Plant plant = plantRepository.findById(id).orElse(null);
        if(plant == null) return null;
        Set<Recette> recetteList = recetteService.findAllByPlantId(Long.valueOf(plant.getId()));
        recetteList.forEach(r -> r.setPlant(null));
        plant.setRecettes(recetteList);
        return plant;
    }
}

