package fr.finkit.demeter.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonProperty
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty
    @Column(name = "last_name")
    private String lastName;

    @JsonProperty
    @Column(name = "email")
    private String email;

}
