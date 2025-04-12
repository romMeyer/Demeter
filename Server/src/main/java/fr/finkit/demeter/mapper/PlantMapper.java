package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantCatalogueDto;
import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.entity.Plant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import javax.xml.catalog.Catalog;

@Mapper(componentModel = "spring", uses = {PlantTypeMapper.class, RecetteMapper.class})
public interface PlantMapper {
    @Mapping(target = "recettes", source = "plantDto.recetteList")
    @Mapping(target = "besoinSoleil", ignore = true)
    Plant toEntity(PlantDto plantDto);

    @Mapping(target = "recetteList", source = "plant.recettes")
    @Mapping(target = "besoinSoleil", source = "plant.besoinSoleil.name")
    PlantDto toDto(Plant plant);

    PlantCatalogueDto toCatalogueDto(Plant plant);
}

