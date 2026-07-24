package com.vinyas.backend.sevice;

import com.vinyas.backend.entity.Url;
import com.vinyas.backend.exception.ShortUrlNotFoundException;
import com.vinyas.backend.repository.UrlRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {
    private UrlRepository urlRepository;
    public static final Logger logger = LoggerFactory.getLogger(UrlService.class);

    private UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public String shortenUrl(String url) {
        Optional<Url> originalUrl = urlRepository.findByOriginalUrl(url);
        if (originalUrl.isEmpty()) {
            String shortCode = generateShortCode();
            logger.info("Short code is created: {}", shortCode);
            Url shortUrl = new Url(url, shortCode);
            urlRepository.save(shortUrl);
            return shortCode;
        }
        Url url1 = originalUrl.get();
        logger.info("Existing short code: {}", url1.getShortCode());
        return url1.getShortCode();
    }

    public String getOriginalUrl(String shortCode) {
        Optional<Url> url = urlRepository.findByShortCode(shortCode);
        if (url.isPresent()) {
            Url urlEntity = url.get();
            Long clickCount = urlEntity.getClickCount();
            urlEntity.setClickCount(++clickCount);
            urlRepository.save(urlEntity);
            logger.info("Redirecting {} to {}", shortCode, urlEntity.getOriginalUrl());
            return urlEntity.getOriginalUrl();
        }
        logger.warn("Short code not found: {}", shortCode);
        throw new ShortUrlNotFoundException("Short URL not found");
    }

    public void increaseClickCount(String shortCode) {
//        clickcount++;
    }

    private String generateShortCode() {
        int length = 6;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        while (true) {
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++) {
                int index = random.nextInt(characters.length());
                result.append(characters.charAt(index));
            }
            String shortCode = result.toString();
            if (!urlRepository.existsByShortCode(shortCode)) {
                return shortCode;
            }
        }
    }
}
