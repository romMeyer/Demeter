package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.RecetteDto;
import fr.finkit.demeter.entity.Recette;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface RecetteMapper {
    @Mapping(target = "plant", ignore = true)
    Recette toEntity(RecetteDto recetteDto);

    RecetteDto toDto(Recette recette);
}
