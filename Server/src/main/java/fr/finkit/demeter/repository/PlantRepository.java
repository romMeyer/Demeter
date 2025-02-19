package fr.finkit.demeter.repository;

import fr.finkit.demeter.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {

    @Query(value = "SELECT p FROM Plant p " +
            "JOIN PlantUser pu ON p.id = pu.id.plant.id " +
            "WHERE pu.id.user.id = :userId")
    List<Plant> findAllByUserId(Long userId);
}
