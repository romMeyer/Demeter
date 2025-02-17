package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    @JsonProperty
    private String username;

    @JsonProperty
    private String password;

    @JsonProperty
    private String firstName;

    @JsonProperty
    private String lastName;

}