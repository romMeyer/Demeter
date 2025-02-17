package fr.finkit.demeter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="plant_user")
@AllArgsConstructor
@NoArgsConstructor
public class PlantUser implements Serializable {
    @EmbeddedId
    private PlantUserId id;

    @Column(name = "arrose")
    private Date arrose;

    @Column(name = "arrosage")
    private Date arrosage;
}
