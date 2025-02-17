package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.entity.Plant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {PlantTypeMapper.class})
public interface PlantMapper {
    Plant toEntity(PlantDto plantdto);

    PlantDto toDto(Plant plant);
}

