package fr.finkit.demeter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@EqualsAndHashCode
public class PlantUserId implements Serializable {

    @Column(name = "plant_id")
    private Integer plantId;

    @Column(name = "user_id")
    private Integer userId;


}