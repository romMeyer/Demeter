package fr.finkit.demeter.mapper;

import fr.finkit.demeter.dto.UserDto;
import fr.finkit.demeter.entity.Role;
import fr.finkit.demeter.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "role", source = "role")
    User toEntity(UserDto userDto);

    @Mapping(target = "role", source = "role.name")
    UserDto toDto(User user);

    default Role map(String roleName) {
        if (roleName == null) return null;
        Role role = new Role();
        if(roleName.equals("ROLE_ADMIN"))
            role.setId(2);
        else
            role.setId(1);
        role.setName(roleName);
        return role;
    }
}

