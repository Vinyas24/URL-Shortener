package com.vinyas.backend.exception;

public class ShortCodeAlreadyExistsException extends RuntimeException{
    public ShortCodeAlreadyExistsException(String message){
        super(message);
    }
}
