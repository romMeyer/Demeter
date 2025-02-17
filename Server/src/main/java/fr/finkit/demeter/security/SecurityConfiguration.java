package fr.finkit.demeter.security;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configurable
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .authorizeHttpRequests(registry ->{
                    registry.requestMatchers("api-open/**").permitAll();
                    registry.requestMatchers("api-admin/**").hasRole("ADMIN");
                    registry.requestMatchers("api/**").authenticated();
                    registry.anyRequest().authenticated();
                })
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
                .username("demeterUser")
                .password("$2a$12$hzlrxygEXmyTQ2b.UMHkSuAtLL1zFD2BbXijGxfAuR6DWPw9zWMdi")
                .roles("USER")
                .build();

        UserDetails admin = User.builder()
                .username("demeterAdmin  ")
                .password("$2a$12$5W7Yl1dS1wF/re17bxl6ceWWQHlfPvzG99Y2e3yYWLig3U7JldgY6")
                .roles("ADMIN", "USER")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
