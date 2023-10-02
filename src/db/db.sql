CREATE TABLE habitaciones (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    numero INT,
    tipo VARCHAR(255),
    valor INT
);

-- Creación de la tabla reservas con código autoincrementable
CREATE TABLE reservas (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    codigo_habitacion INT,
    nombre_cliente VARCHAR(255),
    telefono_cliente VARCHAR(20),
    fecha_reservacion DATE,
    fecha_entrada DATE,
    fecha_salida DATE,
    FOREIGN KEY (codigo_habitacion) REFERENCES habitaciones(codigo)
);