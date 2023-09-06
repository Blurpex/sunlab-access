package edu.psu.sunlabbackend.repository;

import edu.psu.sunlabbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user " +
        "WHERE (LOWER(user.name) LIKE CONCAT('%', :name, '%') OR :name IS NULL) " +
        "AND (id = :id OR :id IS NULL) " +
        "AND (role = :role OR :role IS NULL) " +
        "AND (status = :status OR :status IS NULL)"
        , nativeQuery = true)
    List<User> searchUsers(String name, Long id, String role, String status);

}
