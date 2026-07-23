package com.vinyas.backend.repository;

import com.vinyas.backend.entity.Url;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepository extends CrudRepository<Url, Long> {
    public Optional<Url> findByShortCode(String shortCode);
    public boolean existsByShortCode(String shortCode);
    public Optional<Url> findByOriginalUrl(String originalUrl);
}
