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
