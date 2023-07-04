CREATE DATABASE encuestas;

USE encuestas;

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(255),
    contraseña VARCHAR(255),
    correo_electronico VARCHAR(255)
);

CREATE TABLE test_1(
    id_test INT(2) AUTO_INCREMENT PRIMARY KEY, 
    id_usuario INT(2) NOT NULL,
    resultado_final VARCHAR(35) NOT NULL,
    puntos INT(2) NOT NULL,
    visual INT(4) NOT NULL,
    cinestisico INT(4) NOT NULL,
    auditivo INT(4) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE VIEW users_view_complete AS
SELECT * FROM usuarios INNER JOIN test_1 ON usuarios.id_usuario = test_1.id_usuario;
