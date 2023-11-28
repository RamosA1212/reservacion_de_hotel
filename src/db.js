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
 INSERT INTO reservas (
  codigo_habitacion,
  nombre_cliente,
  telefono_cliente,
  fecha_reservacion,
  fecha_entrada,
  fecha_salida
) VALUES (
  3,
  'Nombre Cliente',
  '1234567890',
  '2023-11-27', 
  '2023-12-01',
  '2023-12-05' 
);
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
