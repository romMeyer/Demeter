package fr.finkit.demeter.repository;

import fr.finkit.demeter.entity.PlantUser;
import fr.finkit.demeter.entity.PlantUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantUserRepository extends JpaRepository<PlantUser, Long> {

    @Query(value = "SELECT pu FROM PlantUser pu " +
            "JOIN Plant p ON p.id = pu.id.plant.id " +
            "WHERE pu.id.user.id = :userId")
    List<PlantUser> findAllByUserId(Integer userId);

    @Query(value = "SELECT pu FROM PlantUser pu " +
            "WHERE pu.id = :plantUserId ")
    PlantUser findByUserIdAndPlantId(PlantUserId plantUserId);

    @Modifying
    @Query(value = "DELETE FROM PlantUser pu " +
            "WHERE pu.id = :plantUserId ")
    void deleteByUserIdAndPlantId(PlantUserId plantUserId);
}
