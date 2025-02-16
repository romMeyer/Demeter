package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.finkit.demeter.entity.PlantType;

public class PlantDto {

    @JsonProperty
    private Integer id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String imageName;

    @JsonProperty
    private PlantType type;
}
