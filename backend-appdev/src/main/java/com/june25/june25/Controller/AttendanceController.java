package com.june25.june25.Controller;

import com.june25.june25.Entity.AttendanceEntity;
import com.june25.june25.Entity.AttendanceStatus;
import com.june25.june25.Service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService service;

    @PostMapping
    public ResponseEntity<AttendanceEntity> createAttendance(
        @RequestParam Long studentId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
        @RequestParam AttendanceStatus status) {
        return ResponseEntity.ok(service.createAttendance(studentId, date, status));
    }

    @GetMapping
    public ResponseEntity<List<AttendanceEntity>> getAllAttendance() {
        return ResponseEntity.ok(service.getAllAttendance());
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<AttendanceEntity>> getByDate(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(service.getAttendanceByDate(date));
    }

    @GetMapping("/by-student")
    public ResponseEntity<List<AttendanceEntity>> getByStudent(@RequestParam Long studentId) {
        return ResponseEntity.ok(service.getAttendanceByStudent(studentId));
    }

    @PutMapping("/{attendanceId}")
    public ResponseEntity<AttendanceEntity> updateAttendance(
        @PathVariable Long attendanceId,
        @RequestParam AttendanceStatus status) {
        return ResponseEntity.ok(service.updateAttendance(attendanceId, status));
    }

    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long attendanceId) {
        service.deleteAttendance(attendanceId);
        return ResponseEntity.noContent().build();
    }
}
