package edu.psu.sunlabbackend.repository;

import edu.psu.sunlabbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {}
