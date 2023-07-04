CREATE DATABASE encuesta;

use encuesta;

CREATE TABLE usuarios (
id_usuario int(11) primary key auto_increment,
nombre_usuario varchar(255) not null,
clave varchar(255) not null,
correo_electronico varchar(255) not null,
admin boolean
);

CREATE TABLE test_1 (
id_test int(11) primary key auto_increment,
id_usuario int(11) not null,
resultado_final varchar(35) default 'Desconocido',
puntos int(11) not null,
visual int(5) default 0,
auditivo int(5) default 0,
cinestesico int(5) default 0,
foreign key (id_usuario) references usuarios(id_usuario)
on delete cascade
on update cascade
);

CREATE VIEW users_view_complete AS
SELECT usuarios.id_usuario, usuarios.nombre_usuario, usuarios.clave, usuarios.correo_electronico, usuarios.admin, test_1.resultado_final FROM usuarios INNER JOIN test_1 ON usuarios.id_usuario = test_1.id_usuario;
