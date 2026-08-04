package com.vinyas.backend.controller;

import com.vinyas.backend.dto.ShortenUrlRequest;
import com.vinyas.backend.dto.ShortenUrlResponse;
import com.vinyas.backend.sevice.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "URL Management")
public class UrlController {
    private UrlService urlService;
    @Value("${app.base-url}")
    private String baseUrl;

    @Operation(summary = "Create short URL",description = "Creates a shortened URL for the provided original URL.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "URL shortened successfully."),
            @ApiResponse(responseCode = "400", description = "Invalid URL.")
    })
    @PostMapping("/")
    public ShortenUrlResponse createUrl(@Valid @RequestBody ShortenUrlRequest shortenUrlRequest) {
        ShortenUrlResponse shortenUrlResponse = new ShortenUrlResponse();
        String shortCode = urlService.shortenUrl(shortenUrlRequest.getOriginalUrl(), shortenUrlRequest.getCustomCode());
        shortenUrlResponse.setShortUrl(baseUrl +shortCode);
        return shortenUrlResponse;
    }

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }
}
