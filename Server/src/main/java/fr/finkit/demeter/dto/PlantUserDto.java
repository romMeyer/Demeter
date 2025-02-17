package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantUserDto implements Serializable {

    @JsonProperty
    private Integer id;

    @JsonProperty
    private Plant plant;

    @JsonProperty
    private User user;

    @JsonProperty
    private Date arrose;

    @JsonProperty
    private Date arrosage;
}
