package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.PlantDto;
import fr.finkit.demeter.dto.UserDto;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserDto userDto);

    UserDto toDto(User user);
}

