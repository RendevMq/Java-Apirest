package com.rensystem.apirest.apirest;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ApirestApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApirestApplication.class, args);
    }

    @Bean
    public Dotenv dotenv() {
        return Dotenv.load();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(Dotenv dotenv) {
        String url = dotenv.get("SPRING_URL"); // Leer la variable del archivo .env

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(url)
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
