CREATE DATABASE business;

CREATE TABLE person(
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age INT,
    ssn CHAR(11),
    PRIMARY KEY(id)
);

INSERT INTO person 
    VALUES ('Jane', 'Doe', 35, '011-02-3548'),
        ('Mary', 'Smith', 17),
        ('Bob', 'Peters', 49, '023-10-3519');
