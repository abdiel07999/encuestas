-- Active: 1684178392201@@127.0.0.1@3306
CREATE DATABASE encuestas
    DEFAULT CHARACTER SET = 'utf8mb4';

USE encuestas;

-- Tabla "Usuarios"
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(255),
    contraseña VARCHAR(255),
    correo_electronico VARCHAR(255)
);

-- Tabla "Encuestas"
CREATE TABLE Encuestas (
    id_encuesta INT PRIMARY KEY AUTO_INCREMENT,
    titulo_encuesta VARCHAR(255),
    descripcion_encuesta VARCHAR(255),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla "Preguntas"
CREATE TABLE Preguntas (
    id_pregunta INT PRIMARY KEY AUTO_INCREMENT,
    texto_pregunta VARCHAR(255),
    tipo_respuesta INT,
    id_encuesta INT,
    FOREIGN KEY (id_encuesta) REFERENCES Encuestas(id_encuesta)
);

-- Tabla "Respuestas"
CREATE TABLE Respuestas (
    id_respuesta INT PRIMARY KEY AUTO_INCREMENT,
    texto_respuesta VARCHAR(255),
    id_pregunta INT,
    FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id_pregunta)
);