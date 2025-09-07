import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root@123',
  database: process.env.DB_NAME ?? 'campus_events',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: false
});

export default pool;
