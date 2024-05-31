-- Crear la base de datos
CREATE DATABASE tienda_colchones;

-- Crear tabla proveedor
CREATE TABLE proveedor (
    idproveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

-- Crear tabla usuario
CREATE TABLE usuario (
    idusuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(200) UNIQUE,
    contraseña VARCHAR(50),
    rol VARCHAR(20) CHECK (rol IN ('Gerente', 'Administrador')),
    
);

-- Crear tabla cliente
CREATE TABLE cliente (
    idcliente SERIAL PRIMARY KEY,
    idusuario INT UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(20),
    FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
);

-- Crear tabla pedido
CREATE TABLE pedido (
    idpedido SERIAL PRIMARY KEY,
    fecha DATE,
    total FLOAT,
    idcliente INT,
    FOREIGN KEY (idcliente) REFERENCES cliente (idcliente)
);

-- Crear tabla producto
CREATE TABLE producto (
    idproducto SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(300),
    precio FLOAT NOT NULL,
    stock INT,
    imagen VARCHAR(200), -- Campo para almacenar la ubicación de la imagen
    idcategoria INT,
    idproveedor INT,   
    FOREIGN KEY (idproveedor) REFERENCES proveedor (idproveedor)
);

-- Crear tabla detallespedido
CREATE TABLE detallespedido (
    iddetalle SERIAL PRIMARY KEY,
    idpedido INT,
    idproducto INT,
    cantidad INT,
    precio_unitario FLOAT,
    FOREIGN KEY (idpedido) REFERENCES pedido (idpedido),
    FOREIGN KEY (idproducto) REFERENCES producto (idproducto)
);