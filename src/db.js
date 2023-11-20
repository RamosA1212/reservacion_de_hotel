import {createPool } from "mysql2/promise";
import {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} from "./config.js "
export const conn = createPool({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME,
});

// Función para ejecutar consultas
async function executeQuery(query) {
    const connection = await conn.getConnection();
    try {
      const [rows, fields] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }
  
  // Consulta para crear la tabla 'habitaciones'
  const createHabitacionesTableQuery = `
    CREATE TABLE habitaciones (
      codigo INT AUTO_INCREMENT PRIMARY KEY,
      numero INT,
      tipo VARCHAR(255),
      valor INT
    );
  `;
  
  // Consulta para crear la tabla 'reservas' con la clave foránea
  const createReservasTableQuery = `
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
  `;
  
  // Ejecutar las consultas de creación de tablas
  async function createTables() {
    try {
      await executeQuery(createHabitacionesTableQuery);
      await executeQuery(createReservasTableQuery);
      console.log("Tablas creadas exitosamente");
    } catch (error) {
      console.error("Error al crear tablas:", error);
    } finally {
      // Cerrar la conexión de la pool después de ejecutar las consultas
      await pool.end();
    }
  }
  
  // Llamar a la función para crear las tablas
  createTables();
