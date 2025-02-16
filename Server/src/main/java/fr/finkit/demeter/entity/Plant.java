package fr.finkit.demeter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="plant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_name")
    private String imageName;

    @JoinColumn(name = "type_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private PlantType type;
}
