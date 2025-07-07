package com.june25.june25.Repository;

import com.june25.june25.Entity.SessionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface SessionsRepository extends JpaRepository<SessionsEntity, LocalDate> {
}
