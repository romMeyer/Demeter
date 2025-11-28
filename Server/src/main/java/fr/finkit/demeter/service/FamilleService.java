package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Famille;
import fr.finkit.demeter.repository.FamilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilleService {
    @Autowired
    private FamilleRepository familleRepository;

    public List<Famille> findAll(){
        return familleRepository.findAll();
    }
}
