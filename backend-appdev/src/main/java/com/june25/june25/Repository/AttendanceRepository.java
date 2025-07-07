package com.june25.june25.Repository;

import com.june25.june25.Entity.AttendanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {
    List<AttendanceEntity> findBySession_SessionDate(LocalDate date);
    List<AttendanceEntity> findByStudent_Id(Long studentId);
}
