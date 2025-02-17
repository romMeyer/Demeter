package fr.finkit.demeter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"fr.finkit.demeter"})
public class DemeterApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemeterApplication.class, args);
	}

}
