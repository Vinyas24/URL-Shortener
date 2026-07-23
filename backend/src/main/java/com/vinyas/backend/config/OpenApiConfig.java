package com.vinyas.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info =
@Info(title = "URL Shortener",
        description = "It shortens the long URL's",
        contact = @Contact(name = "Vinyas", email = "v1ny45248@gmail.com"),
        version = "1.0.0"))
public class OpenApiConfig {
}
