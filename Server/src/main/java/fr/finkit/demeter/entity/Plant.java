package fr.finkit.demeter.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name="plant")
@AllArgsConstructor
@NoArgsConstructor
public class Plant implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "debut_recolte")
    private String debutRecolte;

    @Column(name = "frequence_arrosage")
    private Integer frequenceArrosage;

    @Column(name = "fin_recolte")
    private String finRecolte;

    @JoinColumn(name = "type_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private PlantType plantType;

    @JoinColumn(name = "besoin_soleil_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private BesoinSoleil besoinSoleil;

    @JoinColumn(name = "famille_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Famille famille;

    @OneToMany(mappedBy = "plant", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Recette> recettes = new HashSet<>();

}
