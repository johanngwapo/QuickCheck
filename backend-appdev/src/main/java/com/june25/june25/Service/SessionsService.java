package com.june25.june25.Service;

import com.june25.june25.Entity.SessionsEntity;
import com.june25.june25.Entity.CourseEntity;
import com.june25.june25.Repository.SessionsRepository;
import com.june25.june25.Repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionsService {

    private final SessionsRepository sessionsRepository;
    private final CourseRepository courseRepository;

    public SessionsEntity createSession(LocalDate date, String courseId) {
        CourseEntity course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));

        SessionsEntity session = new SessionsEntity();
        session.setSessionDate(date);
        session.setCourse(course);

        return sessionsRepository.save(session);
    }

    public Optional<SessionsEntity> getSession(LocalDate date) {
        return sessionsRepository.findById(date);
    }

    public List<SessionsEntity> getAllSessions() {
        return sessionsRepository.findAll();
    }

    public SessionsEntity updateSession(LocalDate date, String courseId) {
        SessionsEntity existing = sessionsRepository.findById(date)
            .orElseThrow(() -> new RuntimeException("Session not found"));

        CourseEntity course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));

        existing.setCourse(course);
        return sessionsRepository.save(existing);
    }

    public void deleteSession(LocalDate date) {
        sessionsRepository.deleteById(date);
    }
}
