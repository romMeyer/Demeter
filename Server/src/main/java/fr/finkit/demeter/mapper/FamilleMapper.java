package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.FamilleDto;
import fr.finkit.demeter.entity.Famille;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FamilleMapper {
    FamilleDto toDto(Famille famille);

    Famille toEntity(FamilleDto familleDto);
}
