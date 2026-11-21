import { Router } from "express";
import QRCode from "qrcode";
import { query } from "../db/pool.js";
import { exigirAdmin, exigirPortaria } from "./auth.js";
import { criarPreferencia, buscarPagamentosPorReferencia } from "../services/mercadopago.js";
import { normalizarTelefone } from "../services/telefone.js";
import { EVENTO, urlBackend, urlFrontend } from "../config/evento.js";
import {
  aprovarPedido,
  convitesDoPedido,
  convitesReservados,
  criarPedido,
  enviarConvitePorEmail,
  normalizarCodigo,
  processarPagamentoConvite,
  refPedido,
  validarConvite,
} from "../services/convites.js";

const router = Router();

// Freio simples contra abuso do checkout (que é público): 10 pedidos por IP a cada 10 min.
const tentativas = new Map();
function limitar(req, res, next) {
  const ip = (req.headers["x-forwarded-for"] || req.ip || "").toString().split(",")[0].trim();
  const agora = Date.now();
  const lista = (tentativas.get(ip) || []).filter((t) => agora - t < 10 * 60_000);
  if (lista.length >= 10) return res.status(429).json({ erro: "Muitas tentativas. Aguarde alguns minutos." });
  lista.push(agora);
  tentativas.set(ip, lista);
  next();
}

const emailValido = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Dados públicos do evento (página de compra).
router.get("/info", async (_req, res) => {
  try {
    const reservados = await convitesReservados();
    const restantes = EVENTO.limiteTotal ? Math.max(0, EVENTO.limiteTotal - reservados) : null;
    res.json({
      nome: EVENTO.nome,
      data: EVENTO.data,
      local: EVENTO.local,
      descricao: EVENTO.descricao,
      precoCentavos: EVENTO.precoCentavos,
      maxPorPedido: restantes === null ? EVENTO.maxPorPedido : Math.min(EVENTO.maxPorPedido, restantes),
      esgotado: restantes === 0,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao carregar o evento.", detalhe: err.message });
  }
});

// Cria o pedido e devolve o link de pagamento (Pix, crédito ou débito no Mercado Pago).
// Não exige conta no app: basta nome, e-mail e WhatsApp.
router.post("/checkout", limitar, async (req, res) => {
  try {
    const nome = String(req.body?.nome ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const telefone = normalizarTelefone(req.body?.telefone);
    const quantidade = Number(req.body?.quantidade ?? 1);

    if (nome.length < 3) return res.status(400).json({ erro: "Informe seu nome completo." });
    if (!emailValido(email)) return res.status(400).json({ erro: "Informe um e-mail válido." });
    if (!telefone) return res.status(400).json({ erro: "Informe seu WhatsApp com DDD (ex.: 11 91234-5678)." });
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > EVENTO.maxPorPedido) {
      return res.status(400).json({ erro: `Escolha de 1 a ${EVENTO.maxPorPedido} convites.` });
    }
    if (EVENTO.limiteTotal && (await convitesReservados()) + quantidade > EVENTO.limiteTotal) {
      return res.status(409).json({ erro: "Os convites acabaram ou não há essa quantidade disponível." });
    }

    const pedido = await criarPedido({ nome, email, telefone, quantidade });
    const preferencia = await criarPreferencia({
      titulo: `Convite — ${EVENTO.nome}${quantidade > 1 ? ` (${quantidade}x)` : ""}`,
      precoCentavos: pedido.valor_centavos,
      email,
      urlFrontend: urlFrontend(),
      urlBackend: urlBackend(),
      referenciaExterna: refPedido(pedido.id),
      retorno: {
        success: `${urlFrontend()}/convite/${pedido.token}?retorno=ok`,
        failure: `${urlFrontend()}/convite/${pedido.token}?retorno=falhou`,
        pending: `${urlFrontend()}/convite/${pedido.token}?retorno=pendente`,
      },
    });
    res.json({ initPoint: preferencia.init_point, token: pedido.token });
  } catch (err) {
    console.error("Erro ao criar pedido de convite:", err);
    res.status(500).json({ erro: "Erro ao iniciar o pagamento.", detalhe: err.message });
  }
});

// Página do convite: quem tem o link (token secreto) vê status e QR Codes.
// Se ainda está pendente, confere na hora com o Mercado Pago (sem esperar o webhook).
router.get("/pedido/:token", async (req, res) => {
  try {
    let [pedido] = await query(`SELECT * FROM convite_pedidos WHERE token = $1`, [req.params.token]);
    if (!pedido) return res.status(404).json({ erro: "Convite não encontrado." });

    if (pedido.status === "pendente" && pedido.origem === "mercadopago") {
      try {
        for (const pg of await buscarPagamentosPorReferencia(refPedido(pedido.id))) {
          await processarPagamentoConvite(pg);
        }
        [pedido] = await query(`SELECT * FROM convite_pedidos WHERE token = $1`, [req.params.token]);
      } catch (e) {
        console.error("Erro ao conferir pagamento do convite:", e.message);
      }
    }

    const convites = pedido.status === "pendente" ? [] : await convitesDoPedido(pedido.id);
    res.json({
      status: pedido.status,
      nome: pedido.nome,
      quantidade: pedido.quantidade,
      valorCentavos: pedido.valor_centavos,
      evento: { nome: EVENTO.nome, data: EVENTO.data, local: EVENTO.local },
      emailEnviado: Boolean(pedido.email_enviado_em),
      convites: convites.map((c) => ({ codigo: c.codigo, nome: c.nome, status: c.status, usado: Boolean(c.usado_em) })),
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao carregar o convite.", detalhe: err.message });
  }
});

// Imagem PNG do QR Code (usada no e-mail). O QR contém só o código.
router.get("/qr/:codigo.png", async (req, res) => {
  try {
    const codigo = normalizarCodigo(req.params.codigo);
    const [convite] = await query(`SELECT 1 FROM convites WHERE codigo = $1`, [codigo]);
    if (!convite) return res.sendStatus(404);
    const png = await QRCode.toBuffer(codigo, { width: 440, margin: 2, errorCorrectionLevel: "M" });
    res.set({ "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" });
    res.send(png);
  } catch (err) {
    res.sendStatus(500);
  }
});

// ---- Portaria (quem foi liberado em Administração → usuário → "Conferir ingresso") ----

// Lê um QR Code: marca como usado na primeira vez; da segunda em diante avisa que já foi usado.
router.post("/validar", exigirPortaria, async (req, res) => {
  try {
    const [admin] = await query(`SELECT nome FROM usuarios WHERE id = $1`, [req.usuario.id]);
    res.json(await validarConvite(req.body?.codigo, admin?.nome ?? "portaria"));
  } catch (err) {
    res.status(500).json({ erro: "Erro ao validar o convite.", detalhe: err.message });
  }
});

// Números da portaria e lista de convites (com busca por nome, e-mail, telefone ou código).
router.get("/painel", exigirPortaria, async (req, res) => {
  try {
    const [totais] = await query(`
      SELECT
        COUNT(*) FILTER (WHERE c.status = 'valido')::int AS vendidos,
        COUNT(*) FILTER (WHERE c.status = 'valido' AND c.usado_em IS NOT NULL)::int AS entraram,
        COUNT(*) FILTER (WHERE c.status = 'cancelado')::int AS cancelados
      FROM convites c`);
    const [pendentes] = await query(
      `SELECT COUNT(*)::int AS n FROM convite_pedidos WHERE status = 'pendente' AND criado_em > now() - interval '2 days'`
    );
    const q = String(req.query.q ?? "").trim();
    const lista = await query(
      `SELECT c.id, c.codigo, c.nome, c.status, c.usado_em, c.usado_por, p.email, p.telefone, p.origem, p.token
       FROM convites c JOIN convite_pedidos p ON p.id = c.pedido_id
       WHERE $1 = '' OR c.nome ILIKE '%' || $1 || '%' OR p.email ILIKE '%' || $1 || '%'
          OR p.telefone LIKE '%' || regexp_replace($1, '\\D', '', 'g') || '%' AND regexp_replace($1, '\\D', '', 'g') <> ''
          OR c.codigo = upper(regexp_replace($1, '[^A-Za-z0-9]', '', 'g'))
       ORDER BY c.criado_em DESC LIMIT 200`,
      [q]
    );
    res.json({ ...totais, pendentes: pendentes.n, preco: EVENTO.precoCentavos, lista });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao carregar o painel.", detalhe: err.message });
  }
});

// Emite convites sem passar pelo Mercado Pago (cortesia, ou quem pagou o Pix direto pra você).
router.post("/emitir", exigirAdmin, async (req, res) => {
  try {
    const nome = String(req.body?.nome ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const telefone = req.body?.telefone ? normalizarTelefone(req.body.telefone) : null;
    const quantidade = Number(req.body?.quantidade ?? 1);
    if (nome.length < 2) return res.status(400).json({ erro: "Informe o nome." });
    if (email && !emailValido(email)) return res.status(400).json({ erro: "E-mail inválido." });
    if (req.body?.telefone && !telefone) return res.status(400).json({ erro: "Telefone inválido." });
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 20) {
      return res.status(400).json({ erro: "Escolha de 1 a 20 convites." });
    }
    const pedido = await criarPedido({ nome, email, telefone, quantidade, origem: "manual" });
    await aprovarPedido(pedido.id);
    res.status(201).json({ ok: true, link: `${urlFrontend()}/convite/${pedido.token}`, token: pedido.token });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao emitir o convite.", detalhe: err.message });
  }
});

// Reenvia o e-mail do convite (quando a pessoa diz que não recebeu).
router.post("/pedido/:token/reenviar", exigirAdmin, async (req, res) => {
  try {
    const [pedido] = await query(`SELECT id, status FROM convite_pedidos WHERE token = $1`, [req.params.token]);
    if (!pedido || pedido.status !== "pago") return res.status(404).json({ erro: "Pedido pago não encontrado." });
    res.json(await enviarConvitePorEmail(pedido.id));
  } catch (err) {
    res.status(500).json({ erro: "Erro ao reenviar.", detalhe: err.message });
  }
});

export default router;
