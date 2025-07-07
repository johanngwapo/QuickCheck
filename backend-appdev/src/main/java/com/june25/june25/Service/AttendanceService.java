package com.june25.june25.Service;

import com.june25.june25.Entity.*;
import com.june25.june25.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final SessionsRepository sessionsRepository;
    private final StudentRepository studentRepository;

    public AttendanceEntity createAttendance(Long studentId, LocalDate sessionDate, AttendanceStatus status) {
        StudentEntity student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        SessionsEntity session = sessionsRepository.findById(sessionDate)
            .orElseThrow(() -> new RuntimeException("Session not found"));

        AttendanceEntity attendance = new AttendanceEntity();
        attendance.setStudent(student);
        attendance.setSession(session);
        attendance.setStatus(status);

        return attendanceRepository.save(attendance);
    }

    public List<AttendanceEntity> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public List<AttendanceEntity> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findBySession_SessionDate(date);
    }

    public List<AttendanceEntity> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudent_Id(studentId);
    }

    public AttendanceEntity updateAttendance(Long attendanceId, AttendanceStatus status) {
        AttendanceEntity att = attendanceRepository.findById(attendanceId)
            .orElseThrow(() -> new RuntimeException("Attendance record not found"));
        att.setStatus(status);
        return attendanceRepository.save(att);
    }

    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }
}
