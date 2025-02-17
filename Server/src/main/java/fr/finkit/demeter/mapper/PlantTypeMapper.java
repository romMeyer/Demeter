package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantTypeDto;
import fr.finkit.demeter.entity.PlantType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface PlantTypeMapper {
    PlantType toEntity(PlantTypeDto plantTypeDto);

    PlantTypeDto toDto(PlantType plantType);
}
