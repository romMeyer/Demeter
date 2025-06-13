package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.Plant;
import fr.finkit.demeter.entity.PlantUser;
import fr.finkit.demeter.entity.PlantUserId;
import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.repository.PlantUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class PlantUserService {
    private LocalDateTime now;

    @Autowired
    private PlantUserRepository plantUserRepository;

    public PlantUser savePlantUser(Plant plant, User user) {
        PlantUser plantUser = new PlantUser();
        plantUser.setId(new PlantUserId(plant, user));
        now = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        plantUser.setArrose(Date.from(now.toInstant(ZoneOffset.UTC)));
        plantUser.setArrosage(Date.from(now.plusDays(3).toInstant(ZoneOffset.UTC)));

        return plantUserRepository.save(plantUser);
    }

    public List<PlantUser> findAllByUserId(Integer userId) {
        return plantUserRepository.findAllByUserId(userId);
    }

    public PlantUser findByUserIdAndPlantId(Plant plant, User user){
        return plantUserRepository.findByUserIdAndPlantId(new PlantUserId(plant, user));
    }

    public PlantUser waterPlant(Plant plant, User user) {
        now = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        PlantUser plantUser = findByUserIdAndPlantId(plant, user);
        plantUser.setArrose(Date.from(now.toInstant(ZoneOffset.UTC)));
        plantUser.setArrosage(Date.from(now.plusDays(plant.getFrequenceArrosage()).toInstant(ZoneOffset.UTC)));

        return plantUserRepository.save(plantUser);
    }

    public void deleteByPlantUser(PlantUser plantUser){
        plantUserRepository.delete(plantUser);
    }

    public Boolean isPlantUserNeedWateringByUserId(Integer userId) {
        boolean isPlantNeedWater = false;
        LocalDate today = LocalDate.now();
        List<PlantUser> plantUserList = findAllByUserId(userId);
        for (PlantUser plantUser: plantUserList) {
            LocalDate arrosage = plantUser.getArrosage().toInstant().atZone(ZoneOffset.UTC).toLocalDate();
            if (!arrosage.isAfter(today)) isPlantNeedWater = true;
        }
        return isPlantNeedWater;
    }
}
