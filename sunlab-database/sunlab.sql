DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS log;

CREATE TABLE user (
    id      BIGINT NOT NULL,
    name    VARCHAR(255) NOT NULL,
    role    VARCHAR(20) CHECK (role IN ('ADMIN', 'STUDENT', 'FACULTY', 'JANITOR')),
    status  VARCHAR(20) CHECK (status IN ('ACTIVE', 'SUSPENDED')),
    PRIMARY KEY (id)
);

CREATE TABLE log (
    id      BIGINT,
    time    TIMESTAMP NOT NULL,
    location VARCHAR(5) CHECK (location IN ('IN', 'OUT')),
    PRIMARY KEY (time),
    FOREIGN KEY (id) REFERENCES user (id)
);
