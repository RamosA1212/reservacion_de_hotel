-- Creación de la tabla habitaciones
CREATE TABLE habitaciones (
    codigo INT PRIMARY KEY,
    numero INT,
    tipo VARCHAR(255),
    valor INT
);

-- Creación de la tabla reservas
CREATE TABLE reservas (
    codigo INT PRIMARY KEY,
    codigo_habitacion INT,
    nombre_cliente VARCHAR(255),
    telefono_cliente VARCHAR(20),
    fecha_reservacion DATE,
    fecha_entrada DATE,
    fecha_salida DATE,
    FOREIGN KEY (codigo_habitacion) REFERENCES habitaciones(codigo)
);