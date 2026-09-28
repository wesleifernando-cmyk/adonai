// Cria a tabela de pagamentos se ela ainda não existir. Rode com
// `npm run migrate` sempre que subir o backend pela primeira vez
// num banco novo.
import { pool } from "./pool.js";

async function migrar() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pagamentos (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pendente',
      valor_centavos INTEGER NOT NULL,
      referencia_mercadopago VARCHAR(100) UNIQUE,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
      aprovado_em TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_pagamentos_email ON pagamentos (email);
  `);
  console.log("Migração concluída: tabela 'pagamentos' pronta.");
  await pool.end();
}

migrar().catch((err) => {
  console.error("Erro na migração:", err);
  process.exit(1);
});
