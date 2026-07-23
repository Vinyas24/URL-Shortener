package com.vinyas.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class ShortenUrlResponse {
    @Schema(
            description = "Generated shortened URL",
            example = "http://localhost:8080/xAltLN"
    )
    private String shortUrl;

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }
}
