package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.entity.Plant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PlantTypeMapper.class, RecetteMapper.class})
public interface PlantMapper {
    @Mapping(target = "recetteSet", source = "plantDto.recetteList")
    Plant toEntity(PlantDto plantDto);

    @Mapping(target = "recetteList", source = "plant.recetteSet")
    PlantDto toDto(Plant plant);
}

