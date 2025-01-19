// ESTO ES PARA CONECCION A BASE DE DATOS MYSQL MANUALMENTE SIN PRISMA

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "inacap",
  database: "api_js",
});

export default pool;
