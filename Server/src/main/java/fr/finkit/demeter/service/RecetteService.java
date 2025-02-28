package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Recette;
import fr.finkit.demeter.repository.RecetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RecetteService {

    @Autowired
    private RecetteRepository recetteRepository;

    public Set<Recette> findAllByPlantId(Long plantId) {
        return recetteRepository.findAllByPlantId(plantId);
    }

}

