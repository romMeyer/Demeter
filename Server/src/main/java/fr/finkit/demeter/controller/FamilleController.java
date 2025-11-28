package fr.finkit.demeter.controller;

import fr.finkit.demeter.dto.FamilleDto;
import fr.finkit.demeter.entity.Famille;
import fr.finkit.demeter.mapper.FamilleMapper;
import fr.finkit.demeter.service.FamilleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/familles")
public class FamilleController {

    @Autowired
    private FamilleService familleService;

    @Autowired
    private FamilleMapper familleMapper;

    @GetMapping()
    public ResponseEntity<List<FamilleDto>> getAllFamille() {
        List<Famille> plantList = familleService.findAll();
        List<FamilleDto> familleDtoList = plantList.stream().map(familleMapper::toDto).toList();
        return ResponseEntity.ok(familleDtoList);

    }


}
