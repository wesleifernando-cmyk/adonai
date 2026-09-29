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

    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(120) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha_hash VARCHAR(255) NOT NULL,
      admin BOOLEAN NOT NULL DEFAULT false,
      bloqueado BOOLEAN NOT NULL DEFAULT false,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS quiz_pontuacoes (
      usuario_id INTEGER PRIMARY KEY REFERENCES usuarios (id) ON DELETE CASCADE,
      pontos INTEGER NOT NULL DEFAULT 0,
      nivel INTEGER NOT NULL DEFAULT 1,
      atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("Migração concluída: tabelas 'pagamentos', 'usuarios' e 'quiz_pontuacoes' prontas.");
  await pool.end();
}

migrar().catch((err) => {
  console.error("Erro na migração:", err);
  process.exit(1);
});
