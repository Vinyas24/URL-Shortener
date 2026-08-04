package com.vinyas.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public class ShortenUrlRequest {
    @NotBlank
    @URL
    @Schema(
            description = "Original URL to shorten",
            example = "https://github.com"
    )
    private String originalUrl;

    @Size(min = 3, max = 15)
    @Pattern(regexp = "^[A-Za-z0-9_-]+$", message = "Custom code can only contain letters, numbers, hyphen(-) and underscores(_)")
    private String customCode;

    public String getCustomCode() {
        return customCode;
    }

    public void setCustomCode(String customCode) {
        this.customCode = customCode;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }
}
