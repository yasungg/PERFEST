package com.example.demo.controller;

import groovy.util.logging.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> err = new HashMap<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(c -> err.put(((FieldError) c).getField(), c.getDefaultMessage()));
        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, String>> handleDisabledException(DisabledException dex) {
        Map<String, String> err = new HashMap<>();
        err.put("message", dex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialException(BadCredentialsException bcex) {
        Map<String, String> err = new HashMap<>();
        err.put("message", bcex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
    }
}
