package fr.finkit.demeter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name="plant_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlantUser {
    @EmbeddedId
    private PlantUserId id;

    @Column(name = "arrose")
    private Date arrose;

    @Column(name = "arrosage")
    private Date arrosage;
}
