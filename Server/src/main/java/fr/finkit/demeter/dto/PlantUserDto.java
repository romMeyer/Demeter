package fr.finkit.demeter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.User;

import java.util.Date;

public class PlantUserDto {

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
