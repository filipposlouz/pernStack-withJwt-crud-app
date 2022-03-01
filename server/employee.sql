CREATE DATABASE employees;

CREATE TABLE employee (
	id SERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	afm VARCHAR(9) NOT NULL,
	date_of_birth DATE NOT NULL
);

CREATE TABLE authenticatedUser (
	username VARCHAR(50) NOT NULL,
	userPassword VARCHAR(50) NOT NULL
);

INSERT INTO authenticatedUser(username, userPassword) VALUES('admin', 'admin');