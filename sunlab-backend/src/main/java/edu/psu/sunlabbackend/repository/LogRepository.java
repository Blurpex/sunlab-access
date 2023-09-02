package edu.psu.sunlabbackend.repository;

import edu.psu.sunlabbackend.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;

public interface LogRepository extends JpaRepository<Log, Timestamp> {}
