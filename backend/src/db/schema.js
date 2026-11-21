import { query } from "./pool.js";

// Ajustes de tabela que precisam existir sempre (idempotentes). Rodam
// quando o servidor sobe, pra não depender de migração manual no Railway.
//  - pagamentos.valido_ate: até quando o acesso comprado vale. NULL = sem
//    vencimento (acessos liberados de graça e pagamentos antigos).
//  - pagamentos.origem: de onde veio (mercadopago, manual, gratis).
export async function garantirSchema() {
  await query(`ALTER TABLE pagamentos ADD COLUMN IF NOT EXISTS valido_ate TIMESTAMPTZ`);
  await query(`ALTER TABLE pagamentos ADD COLUMN IF NOT EXISTS origem VARCHAR(20)`);
  // Telefone (WhatsApp) do usuário, só números com 55 na frente — pra contato/remarketing.
  await query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefone VARCHAR(20)`);
}

// Convites do evento: um pedido (quem comprou) tem 1+ convites, cada um com
// um código único (o QR). O convite só passa a existir depois do pagamento
// aprovado, e usado_em só pode ser preenchido uma vez (leitura única).
export async function garantirSchemaConvites() {
  // Quem pode conferir ingresso na portaria (além dos administradores que o
  // liberarem). Na primeira vez que a coluna é criada, só o Weslei já fica liberado.
  const [coluna] = await query(
    `SELECT 1 FROM information_schema.columns WHERE table_name = 'usuarios' AND column_name = 'pode_conferir'`
  );
  if (!coluna) {
    await query(`ALTER TABLE usuarios ADD COLUMN pode_conferir BOOLEAN NOT NULL DEFAULT false`);
    await query(`UPDATE usuarios SET pode_conferir = true WHERE lower(email) = 'weslei.fernando@yahoo.com.br'`);
  }
  await query(`
    CREATE TABLE IF NOT EXISTS convite_pedidos (
      id SERIAL PRIMARY KEY,
      token VARCHAR(40) UNIQUE NOT NULL,
      nome VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefone VARCHAR(20),
      quantidade INTEGER NOT NULL,
      valor_centavos INTEGER NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pendente',
      origem VARCHAR(20) NOT NULL DEFAULT 'mercadopago',
      mp_payment_id VARCHAR(40),
      email_enviado_em TIMESTAMPTZ,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
      pago_em TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_convite_pedidos_email ON convite_pedidos (email);

    CREATE TABLE IF NOT EXISTS convites (
      id SERIAL PRIMARY KEY,
      pedido_id INTEGER NOT NULL REFERENCES convite_pedidos (id) ON DELETE CASCADE,
      codigo VARCHAR(40) UNIQUE NOT NULL,
      nome VARCHAR(120) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'valido',
      usado_em TIMESTAMPTZ,
      usado_por VARCHAR(120),
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_convites_pedido ON convites (pedido_id);
  `);
}
