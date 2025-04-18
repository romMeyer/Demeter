package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantTypeDto implements Serializable {

    @JsonProperty
    private Integer id;

    @JsonProperty
    private String name;

}
