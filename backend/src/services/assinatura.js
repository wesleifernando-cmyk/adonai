import { query } from "../db/pool.js";

// Considera ativo se: (a) tem um pagamento único aprovado (jeito antigo,
// inclui os acessos liberados de graça pelo admin) OU (b) tem uma
// assinatura recorrente autorizada no Mercado Pago.
export async function assinaturaAtivaPara(email) {
  const [pagamentoAntigo] = await query(
    `SELECT id FROM pagamentos WHERE email = $1 AND status = 'aprovado' LIMIT 1`,
    [email]
  );
  if (pagamentoAntigo) return true;

  const [assinatura] = await query(
    `SELECT id FROM assinaturas WHERE email = $1 AND status = 'authorized' LIMIT 1`,
    [email]
  );
  return Boolean(assinatura);
}
