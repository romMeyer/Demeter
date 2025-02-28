package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private RecetteService recetteService;

    public List<Plant> getAllPlants() {
        //List<Plant> plants = plantRepository.findAll();
        //plants.forEach(plant -> plant.setRecetteSet(recetteService.findAllByPlantId(Long.valueOf(plant.getId())))); // Force le chargement
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
}

