import { query } from "../db/pool.js";

export const DIAS_ACESSO = 30;

// Situação do acesso de um e-mail. Ativo se:
//  (a) assinatura recorrente autorizada no Mercado Pago (cartão), OU
//  (b) pagamento aprovado sem prazo (pagamentos antigos e acessos
//      liberados de graça pelo admin), OU
//  (c) pagamento aprovado com prazo (Pix/crédito/débito avulso ou
//      liberação manual) cujo valido_ate ainda não passou.
// Passou o prazo, o acesso corta sozinho e a pessoa precisa pagar de novo.
export async function acessoDe(email) {
  const [assinatura] = await query(
    `SELECT id FROM assinaturas WHERE email = $1 AND status = 'authorized' LIMIT 1`,
    [email]
  );
  const [sem] = await query(
    `SELECT id FROM pagamentos WHERE email = $1 AND status = 'aprovado' AND valido_ate IS NULL LIMIT 1`,
    [email]
  );
  const [prazo] = await query(
    `SELECT MAX(valido_ate) AS ate FROM pagamentos WHERE email = $1 AND status = 'aprovado' AND valido_ate IS NOT NULL`,
    [email]
  );
  const ate = prazo?.ate ? new Date(prazo.ate) : null;
  const vigente = ate && ate.getTime() > Date.now();

  let tipo = null;
  if (assinatura) tipo = "cartao";
  else if (sem) tipo = "sem_vencimento";
  else if (vigente) tipo = "avulso";

  const diasRestantes = vigente ? Math.ceil((ate.getTime() - Date.now()) / 86_400_000) : null;
  return {
    ativo: Boolean(tipo),
    tipo,
    ate: tipo === "avulso" ? ate.toISOString() : null,
    diasRestantes: tipo === "avulso" ? diasRestantes : null,
    venceuEm: !tipo && ate ? ate.toISOString() : null,
  };
}

export async function assinaturaAtivaPara(email) {
  return (await acessoDe(email)).ativo;
}

// Soma `dias` ao acesso com prazo do e-mail: se ainda está valendo, soma
// em cima do vencimento atual; se já venceu (ou nunca teve), conta de agora.
export async function registrarAcessoComPrazo({ email, dias = DIAS_ACESSO, valorCentavos, origem, referencia = null }) {
  const [base] = await query(
    `SELECT GREATEST(now(), COALESCE(MAX(valido_ate), now())) AS inicio
     FROM pagamentos WHERE email = $1 AND status = 'aprovado' AND valido_ate IS NOT NULL`,
    [email]
  );
  const [linha] = await query(
    `INSERT INTO pagamentos (email, status, valor_centavos, referencia_mercadopago, aprovado_em, valido_ate, origem)
     VALUES ($1, 'aprovado', $2, $3, now(), $4::timestamptz + ($5 || ' days')::interval, $6)
     ON CONFLICT (referencia_mercadopago) DO NOTHING
     RETURNING valido_ate`,
    [email, valorCentavos, referencia, base.inicio, String(dias), origem]
  );
  return linha?.valido_ate ?? null;
}
