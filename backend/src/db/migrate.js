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
      facebook_id VARCHAR(64) UNIQUE,
      foto_url TEXT,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS quiz_pontuacoes (
      usuario_id INTEGER PRIMARY KEY REFERENCES usuarios (id) ON DELETE CASCADE,
      pontos INTEGER NOT NULL DEFAULT 0,
      nivel INTEGER NOT NULL DEFAULT 1,
      acertos_seguidos INTEGER NOT NULL DEFAULT 0,
      perguntas_corretas INTEGER NOT NULL DEFAULT 0,
      atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS quiz_perguntas (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
      pergunta TEXT NOT NULL,
      opcoes JSONB NOT NULL,
      resposta_correta INTEGER NOT NULL,
      explicacao TEXT,
      nivel INTEGER NOT NULL,
      respondida BOOLEAN NOT NULL DEFAULT false,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_quiz_perguntas_usuario ON quiz_perguntas (usuario_id);

    CREATE TABLE IF NOT EXISTS catolico_responde_historico (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
      pergunta TEXT NOT NULL,
      resposta TEXT NOT NULL,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_catolico_responde_usuario ON catolico_responde_historico (usuario_id);

    CREATE TABLE IF NOT EXISTS leitura_progresso (
      usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
      livro_slug VARCHAR(80) NOT NULL,
      pagina_atual INTEGER NOT NULL DEFAULT 1,
      atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (usuario_id, livro_slug)
    );

    CREATE TABLE IF NOT EXISTS leitura_marcacoes (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
      livro_slug VARCHAR(80) NOT NULL,
      pagina INTEGER NOT NULL,
      trecho TEXT NOT NULL,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_leitura_marcacoes_usuario_livro ON leitura_marcacoes (usuario_id, livro_slug);

    CREATE TABLE IF NOT EXISTS assinaturas (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
      email VARCHAR(255) NOT NULL,
      mp_preapproval_id VARCHAR(100) UNIQUE,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      valor_centavos INTEGER NOT NULL,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
      atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_assinaturas_usuario ON assinaturas (usuario_id);
  `);
  console.log(
    "Migração concluída: tabelas 'pagamentos', 'usuarios', 'quiz_pontuacoes', 'quiz_perguntas', " +
      "'catolico_responde_historico', 'leitura_progresso', 'leitura_marcacoes' e 'assinaturas' prontas."
  );
  await pool.end();
}

migrar().catch((err) => {
  console.error("Erro na migração:", err);
  process.exit(1);
});
