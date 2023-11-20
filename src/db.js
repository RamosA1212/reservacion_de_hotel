import {createPool } from "mysql2/promise";
import {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} from "./config.js "
export const conn = createPool({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME,
});


async function executeQuery(query) {
    const connection = await conn.getConnection();
    try {
      const [rows, fields] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }
  

  const createUsuarios = `
  CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'solicitante') NOT NULL
  );
  `;
  

  
  

  async function createTables() {
    try {
      await executeQuery(createUsuarios);
      console.log("Tablas creadas exitosamente");
    } catch (error) {
      console.error("Error al crear tablas:", error);
    } finally {
      
    //   await conn.end();
    }
  }
  

  createTables();
