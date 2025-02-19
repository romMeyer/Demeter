package fr.finkit.demeter.repository;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query(value = "SELECT r.name FROM Role r " +
            "JOIN User u ON u.role.id = r.id " +
            "WHERE u.username = :username")
    String findRoleByUsername(String username);
}
