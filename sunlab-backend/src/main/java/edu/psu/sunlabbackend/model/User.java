package edu.psu.sunlabbackend.model;

import edu.psu.sunlabbackend.model.enums.Role;
import edu.psu.sunlabbackend.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="user")
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User  {

    @Id
    @Column(name="id", nullable=false)
    private Long Id;

    @Column(name="name", nullable=false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private Status status;

}
