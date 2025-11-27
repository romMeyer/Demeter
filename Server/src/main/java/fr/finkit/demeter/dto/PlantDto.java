package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.finkit.demeter.entity.BesoinSoleil;
import fr.finkit.demeter.entity.Famille;
import fr.finkit.demeter.entity.PlantType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantDto implements Serializable {

    @JsonProperty
    private Integer id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String description;

    @JsonProperty
    private List<RecetteDto> recetteList;

    @JsonProperty
    private String debutRecolte;

    @JsonProperty
    private String finRecolte;

    @JsonProperty
    private String imageName;

    @JsonProperty
    private String frequenceArrosage;

    @JsonProperty
    private Famille famille;

    @JsonProperty
    private BesoinSoleil besoinSoleil;

    @JsonProperty
    private PlantType plantType;
}
