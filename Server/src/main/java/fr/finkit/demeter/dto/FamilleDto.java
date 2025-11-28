package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FamilleDto {

    @JsonProperty
    private Long id;

    @JsonProperty
    private String name;
}
