package edu.psu.sunlabbackend.repository;

import edu.psu.sunlabbackend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {}
