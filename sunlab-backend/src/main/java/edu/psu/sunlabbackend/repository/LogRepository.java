package edu.psu.sunlabbackend.repository;

import edu.psu.sunlabbackend.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface LogRepository extends JpaRepository<Log, Timestamp> {

    @Query(value = "SELECT * FROM log " +
            "WHERE (id = :id OR :id IS NULL) " +
            "AND (location = :location OR :location IS NULL) " +
            "AND (time = :time OR :time IS NULL)"
            , nativeQuery = true)
    List<Log> searchLogs(Long id, String location, Timestamp time);

}
