package fr.finkit.demeter.service;

import fr.finkit.demeter.entity.User;
import fr.finkit.demeter.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            log.error("Aucune authentication trouvée dans SecurityContextHolder");
            return null;
        }

        if (authentication.getPrincipal() instanceof UserDetails) {
            String username = ((UserDetails) authentication.getPrincipal()).getUsername();

            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        }

        log.error("User is not authenticated");
        return null;
    }


    public String findRoleByUsername(String username) {
        return userRepository.findRoleByUsername(username)
    ;}

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}

