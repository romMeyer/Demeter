package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.PlantUser;
import fr.finkit.demeter.entity.PlantUserId;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.repository.PlantUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Service
public class PlantUserService {

    @Autowired
    private PlantUserRepository plantUserRepository;

    public PlantUser savePlantUser(Plant plant, User user) {
        PlantUser plantUser = new PlantUser();
        plantUser.setId(new PlantUserId(plant, user));
        LocalDateTime now = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        plantUser.setArrose(Date.from(now.toInstant(ZoneOffset.UTC)));
        plantUser.setArrosage(Date.from(now.plusDays(3).toInstant(ZoneOffset.UTC)));

        return plantUserRepository.save(plantUser);
    }

    public List<PlantUser> findAllByUserId(Integer userId) {
        return plantUserRepository.findAllByUserId(userId);
    }

    public PlantUser waterPlant(Plant plant, User user) {
        LocalDateTime now = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        PlantUser plantUser = plantUserRepository.findByUserIdAndPlantId(new PlantUserId(plant, user));
        plantUser.setArrose(Date.from(now.toInstant(ZoneOffset.UTC)));
        plantUser.setArrosage(Date.from(now.plusDays(3).toInstant(ZoneOffset.UTC)));

        return plantUserRepository.save(plantUser);
    }
}
