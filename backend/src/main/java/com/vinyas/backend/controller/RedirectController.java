package com.vinyas.backend.controller;

import com.vinyas.backend.sevice.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "Redirect")
@RestController
public class RedirectController {
    private UrlService urlService;

    @Operation(description = "Redirect to original URL")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "302", description = "Redirect to original URL."),
            @ApiResponse(responseCode = "404", description = "Original URL not found.")
    })
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> getUrl(@PathVariable String shortCode) {
        String originalUrl = urlService.getOriginalUrl(shortCode);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(URI.create(originalUrl));
        return new ResponseEntity<Void>(null,httpHeaders, HttpStatus.FOUND);
    }

    public RedirectController(UrlService urlService) {
        this.urlService = urlService;
    }

}
