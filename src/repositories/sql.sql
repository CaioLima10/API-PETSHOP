-- Active: 1684820593705@@127.0.0.1@3306
-- CREATE TABLE proprietarios (id TEXT NOT NULL PRIMARY KEY, nome TEXT NOT NULL, cpf NOT NULL, telefone NOT NULL) 
CREATE TABLE pets (id TEXT NOT NULL PRIMARY KEY, proprietarioId TEXT NOT NULL, nome  TEXT NOT NULL, idade NOT NULL, peso NOT NULL, raca TEXT NOT NULL)