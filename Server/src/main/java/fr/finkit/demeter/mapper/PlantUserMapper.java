package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantUserDto;
import fr.finkit.demeter.entity.PlantUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PlantMapper.class, UserMapper.class})
public interface PlantUserMapper {

    PlantUser toEntity(PlantUserDto plantUserDto);

    @Mapping(target = "user", source = "plantUser.id.user")
    @Mapping(target = "plant", source = "plantUser.id.plant")
    PlantUserDto toDto(PlantUser plantUser);
}

