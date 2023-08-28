DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS log;

CREATE TABLE users (
    id      BIGINT,
    name    VARCHAR(255),
    role    VARCHAR(20) CHECK (role IN ('ADMIN, STUDENT, FACULTY, JANITOR')),
    status  VARCHAR(20) CHECK (status IN ('ACTIVE', 'SUSPENDED')),
    PRIMARY KEY (id)
);

CREATE TABLE log (
    id      BIGINT ,
    time    TIME,
    location VARCHAR(5) CHECK (location IN ('IN', 'OUT')),
    PRIMARY KEY (id, time),
    FOREIGN KEY (id) REFERENCES users (id)
);

