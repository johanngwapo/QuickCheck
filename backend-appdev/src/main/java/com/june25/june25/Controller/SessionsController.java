package com.june25.june25.Controller;

import com.june25.june25.Entity.SessionsEntity;
import com.june25.june25.Service.SessionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionsController {

    private final SessionsService service;

    @PostMapping
    public ResponseEntity<SessionsEntity> createSession(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
        @RequestParam String courseId) {
        return ResponseEntity.ok(service.createSession(date, courseId));
    }

    @GetMapping("/{date}")
    public ResponseEntity<SessionsEntity> getSession(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.getSession(date)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<SessionsEntity>> getAllSessions() {
        return ResponseEntity.ok(service.getAllSessions());
    }

    @PutMapping("/{date}")
    public ResponseEntity<SessionsEntity> updateSession(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
        @RequestParam String courseId) {
        return ResponseEntity.ok(service.updateSession(date, courseId));
    }

    @DeleteMapping("/{date}")
    public ResponseEntity<Void> deleteSession(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        service.deleteSession(date);
        return ResponseEntity.noContent().build();
    }
}
