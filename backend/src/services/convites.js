import crypto from "node:crypto";
import { pool, query } from "../db/pool.js";
import { EVENTO, urlBackend, urlFrontend } from "../config/evento.js";
import { enviarEmail } from "./email.js";

// Alfabeto sem letras/números que se confundem (0/O, 1/I/L).
const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** 20 caracteres aleatórios (~100 bits): impossível de adivinhar. */
export function gerarCodigo() {
  return Array.from(crypto.randomBytes(20), (b) => ALFABETO[b % ALFABETO.length])
    .slice(0, 20)
    .join("");
}

/** Aceita o que vier da câmera: com traços, minúsculas, ou uma URL que termine no código. */
export function normalizarCodigo(valor) {
  const texto = String(valor ?? "").trim().split(/[/?#]/).filter(Boolean).pop() ?? "";
  return texto.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

export function formatarCodigo(codigo) {
  return codigo.match(/.{1,5}/g)?.join("-") ?? codigo;
}

export const refPedido = (id) => `CONVITE:${id}`;

const escapar = (t) =>
  String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const reais = (centavos) => `R$ ${(centavos / 100).toFixed(2).replace(".", ",")}`;

/** Quantos convites já foram vendidos (pagos + pedidos pendentes recentes). */
export async function convitesReservados() {
  const [r] = await query(
    `SELECT COALESCE(SUM(quantidade), 0)::int AS n FROM convite_pedidos
     WHERE status = 'pago' OR (status = 'pendente' AND criado_em > now() - interval '30 minutes')`
  );
  return r.n;
}

export async function criarPedido({ nome, email, telefone, quantidade, origem = "mercadopago" }) {
  const token = crypto.randomBytes(16).toString("hex");
  const [pedido] = await query(
    `INSERT INTO convite_pedidos (token, nome, email, telefone, quantidade, valor_centavos, origem)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [token, nome, email, telefone, quantidade, EVENTO.precoCentavos * quantidade, origem]
  );
  return pedido;
}

/**
 * Marca o pedido como pago e cria os convites (um por pessoa). Só acontece
 * uma vez por pedido: se o webhook chegar duas vezes, a segunda não faz nada.
 */
export async function aprovarPedido(pedidoId, { mpPaymentId = null } = {}) {
  const client = await pool.connect();
  let pedido = null;
  try {
    await client.query("BEGIN");
    const r = await client.query(
      `UPDATE convite_pedidos SET status = 'pago', pago_em = now(), mp_payment_id = $2
       WHERE id = $1 AND status = 'pendente' RETURNING *`,
      [pedidoId, mpPaymentId ? String(mpPaymentId) : null]
    );
    pedido = r.rows[0] ?? null;
    if (pedido) {
      for (let i = 1; i <= pedido.quantidade; i++) {
        await client.query(`INSERT INTO convites (pedido_id, codigo, nome) VALUES ($1, $2, $3)`, [
          pedido.id,
          gerarCodigo(),
          pedido.quantidade > 1 ? `${pedido.nome} (convite ${i} de ${pedido.quantidade})` : pedido.nome,
        ]);
      }
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  if (pedido) await enviarConvitePorEmail(pedido.id).catch((e) => console.error("Erro ao enviar e-mail do convite:", e.message));
  return Boolean(pedido);
}

/** Pagamento devolvido/cancelado depois de aprovado: os convites deixam de valer. */
export async function cancelarPedido(pedidoId) {
  const r = await query(
    `UPDATE convite_pedidos SET status = 'estornado' WHERE id = $1 AND status = 'pago' RETURNING id`,
    [pedidoId]
  );
  if (r.length) await query(`UPDATE convites SET status = 'cancelado' WHERE pedido_id = $1`, [pedidoId]);
  return r.length > 0;
}

/** Trata um pagamento do Mercado Pago que pertence a um pedido de convite. */
export async function processarPagamentoConvite(pagamento) {
  const ref = String(pagamento?.external_reference || "");
  if (!ref.startsWith("CONVITE:")) return false;
  const pedidoId = Number(ref.slice(8));
  const [pedido] = await query(`SELECT * FROM convite_pedidos WHERE id = $1`, [pedidoId]);
  if (!pedido) return false;

  if (pagamento.status === "approved") {
    const pago = Math.round(Number(pagamento.transaction_amount || 0) * 100);
    if (pago < pedido.valor_centavos) {
      console.error(`Pagamento ${pagamento.id} menor que o pedido ${pedidoId}: ${pago} < ${pedido.valor_centavos}`);
      return false;
    }
    return aprovarPedido(pedidoId, { mpPaymentId: pagamento.id });
  }
  if (["refunded", "charged_back", "cancelled"].includes(pagamento.status)) {
    return cancelarPedido(pedidoId);
  }
  return false;
}

export async function convitesDoPedido(pedidoId) {
  return query(
    `SELECT id, codigo, nome, status, usado_em FROM convites WHERE pedido_id = $1 ORDER BY id`,
    [pedidoId]
  );
}

/**
 * Leitura do QR na portaria. O UPDATE só acerta se o convite ainda não foi
 * usado, então duas leituras ao mesmo tempo nunca passam as duas.
 */
export async function validarConvite(codigoBruto, quem) {
  const codigo = normalizarCodigo(codigoBruto);
  if (!codigo) return { resultado: "invalido" };

  const [liberado] = await query(
    `UPDATE convites SET usado_em = now(), usado_por = $2
     WHERE codigo = $1 AND status = 'valido' AND usado_em IS NULL
     RETURNING id, nome, usado_em, pedido_id`,
    [codigo, quem]
  );
  if (liberado) {
    const [p] = await query(`SELECT quantidade FROM convite_pedidos WHERE id = $1`, [liberado.pedido_id]);
    return { resultado: "liberado", nome: liberado.nome, usadoEm: liberado.usado_em, pedidoQuantidade: p?.quantidade ?? 1 };
  }

  const [existente] = await query(`SELECT nome, status, usado_em, usado_por FROM convites WHERE codigo = $1`, [codigo]);
  if (!existente) return { resultado: "invalido" };
  if (existente.status === "cancelado") return { resultado: "cancelado", nome: existente.nome };
  return { resultado: "ja_usado", nome: existente.nome, usadoEm: existente.usado_em, usadoPor: existente.usado_por };
}

function htmlEmail(pedido, convites) {
  const link = `${urlFrontend()}/convite/${pedido.token}`;
  const blocos = convites
    .map(
      (c) => `
      <div style="margin:20px 0;padding:18px;border:1px solid #e3d9c8;border-radius:14px;text-align:center;background:#fff">
        <p style="margin:0 0 10px;font-weight:700;font-size:16px">${escapar(c.nome)}</p>
        <img src="${urlBackend()}/convites/qr/${c.codigo}.png" width="220" height="220" alt="QR Code do convite" style="display:block;margin:0 auto" />
        <p style="margin:10px 0 0;font-family:Menlo,monospace;font-size:13px;letter-spacing:1px;color:#555">${formatarCodigo(c.codigo)}</p>
      </div>`
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f1e7;font-family:Arial,Helvetica,sans-serif;color:#222">
    <div style="max-width:480px;margin:0 auto">
      <h1 style="font-size:22px;margin:0 0 6px">Seu convite está confirmado 🙏</h1>
      <p style="margin:0 0 14px;color:#555">Oi, ${escapar(pedido.nome.split(" ")[0])}! Recebemos o pagamento de ${reais(pedido.valor_centavos)}.</p>
      <div style="padding:14px 16px;border-radius:12px;background:#fff;border:1px solid #e3d9c8">
        <p style="margin:0;font-weight:700">${escapar(EVENTO.nome)}</p>
        <p style="margin:4px 0 0">📅 ${escapar(EVENTO.data)}</p>
        <p style="margin:2px 0 0">📍 ${escapar(EVENTO.local)}</p>
      </div>
      ${blocos}
      <p style="margin:18px 0 6px"><strong>Na entrada:</strong> mostre o QR Code acima. Cada QR Code vale <strong>uma única entrada</strong> e só pode ser lido uma vez, então não compartilhe a imagem com quem não vai usar.</p>
      <p style="margin:0 0 18px"><a href="${link}" style="color:#b3470f;font-weight:700">Abrir meu convite no celular</a> (guarde esse link).</p>
      <p style="margin:0;color:#888;font-size:12px">Missão Adonai</p>
    </div></body></html>`;
}

export async function enviarConvitePorEmail(pedidoId) {
  const [pedido] = await query(`SELECT * FROM convite_pedidos WHERE id = $1`, [pedidoId]);
  if (!pedido || !pedido.email) return { enviado: false, motivo: "sem_email" };
  const convites = await convitesDoPedido(pedido.id);
  const link = `${urlFrontend()}/convite/${pedido.token}`;
  const resultado = await enviarEmail({
    para: pedido.email,
    assunto: `Seu convite — ${EVENTO.nome}`,
    html: htmlEmail(pedido, convites),
    texto:
      `Seu convite está confirmado.\n${EVENTO.nome}\n${EVENTO.data}\n${EVENTO.local}\n\n` +
      convites.map((c) => `${c.nome}: ${formatarCodigo(c.codigo)}`).join("\n") +
      `\n\nAbra o QR Code no celular: ${link}\nCada QR Code vale uma única entrada.`,
  });
  if (resultado.enviado) await query(`UPDATE convite_pedidos SET email_enviado_em = now() WHERE id = $1`, [pedido.id]);
  return resultado;
}
