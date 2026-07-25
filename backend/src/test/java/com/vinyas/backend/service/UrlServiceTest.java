package com.vinyas.backend.service;

import com.vinyas.backend.entity.Url;
import com.vinyas.backend.exception.ShortUrlNotFoundException;
import com.vinyas.backend.repository.UrlRepository;
import com.vinyas.backend.sevice.UrlService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UrlServiceTest {
    @Mock
    private UrlRepository urlRepository;

    @InjectMocks
    private UrlService urlService;

    @Captor
    private ArgumentCaptor<Url> urlCaptor;

    @Test
    void shouldCreateShortUrlIfOriginalUrlDoesNotExist() {
        String originalUrl = "https://github.com";
        when(urlRepository.findByOriginalUrl(originalUrl)).thenReturn(Optional.empty());
        urlService.shortenUrl(originalUrl);
        verify(urlRepository, times(1)).save(urlCaptor.capture());
        Url savedUrl = urlCaptor.getValue();
        assertNotNull(savedUrl.getShortCode());
        assertEquals(originalUrl, savedUrl.getOriginalUrl());
        assertEquals(6, savedUrl.getShortCode().length());
    }

    @Test
    void shouldReturnExistingShortCode() {
        Url existingUrl = new Url("https://example.com", "abc123");
        when(urlRepository.findByOriginalUrl(existingUrl.getOriginalUrl())).thenReturn(Optional.of(existingUrl));
        String shortUrl = urlService.shortenUrl(existingUrl.getOriginalUrl());
        verify(urlRepository, never()).save(any(Url.class));
        assertEquals("abc123", shortUrl);
    }

    @Test
    void shouldRedirectToOriginalUrl() {
        Url url = new Url("https://example.com", "abc123");
        url.setClickCount(0L);
        when(urlRepository.findByShortCode(url.getShortCode())).thenReturn(Optional.of(url));
        String originalUrl = urlService.getOriginalUrl(url.getShortCode());
        verify(urlRepository, times(1)).save(urlCaptor.capture());
        Url updatedUrl = urlCaptor.getValue();
        assertEquals(originalUrl, updatedUrl.getOriginalUrl());
        assertEquals(1L, updatedUrl.getClickCount());
    }

    @Test
    void shouldThrowExceptionWhenShortCodeNotExist() {
        String shortCode = "invalid";
        when(urlRepository.findByShortCode(shortCode)).thenReturn(Optional.empty());
        assertThrows(ShortUrlNotFoundException.class, () -> urlService.getOriginalUrl(shortCode));
        verify(urlRepository, never()).save(any(Url.class));
    }
}
