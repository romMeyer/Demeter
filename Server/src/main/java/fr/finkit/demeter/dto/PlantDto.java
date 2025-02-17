package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.finkit.demeter.entity.PlantType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantDto implements Serializable {

    @JsonProperty
    private Integer id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String imageName;

    @JsonProperty
    private PlantType type;
}
