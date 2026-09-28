// Conexão única com o Postgres, reutilizada em todo o backend.
// No Railway, a variável DATABASE_URL já vem pronta quando você
// adiciona um banco Postgres ao projeto.
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("railway")
    ? { rejectUnauthorized: false }
    : false,
});

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result.rows;
}
