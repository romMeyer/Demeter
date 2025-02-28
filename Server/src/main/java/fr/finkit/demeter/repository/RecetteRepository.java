package fr.finkit.demeter.repository;

import fr.finkit.demeter.entity.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RecetteRepository extends JpaRepository<Recette, Long> {

    @Query(value = "SELECT r FROM Recette r " +
            "JOIN Plant p on r.plant.id = p.id " +
            "WHERE p.id = :plantId")
    Set<Recette> findAllByPlantId(Long plantId);
}
