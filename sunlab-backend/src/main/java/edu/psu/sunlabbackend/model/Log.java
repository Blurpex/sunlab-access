package edu.psu.sunlabbackend.model;

import edu.psu.sunlabbackend.model.enums.Location;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity(name="log")
@Table(name="log")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Log {

    @Id
    @Column(name="time")
    private Timestamp Time;

    @ManyToOne
    @JoinColumn(name="id")
    private User ID;

    @Enumerated(EnumType.STRING)
    @Column(name = "location")
    private Location location;

}
