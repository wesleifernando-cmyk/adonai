import { Router } from "express";
import { query } from "../db/pool.js";
import { criarPreferencia, buscarPagamento } from "../services/mercadopago.js";
import { exigirLogin } from "./auth.js";

const router = Router();

// Preço único do acesso — R$9,90, à vista (Pix, crédito ou débito,
// escolhido pela própria pessoa na tela do Mercado Pago).
const PRECO_CENTAVOS = 990;
const TITULO_PRODUTO = "Acesso Adonai";

const urlFrontend = () => process.env.FRONTEND_URL || "http://localhost:5173";
const urlBackend = () => process.env.BACKEND_URL || "http://localhost:3002";

// Cria o link de pagamento pro usuário JÁ LOGADO (agora que o Adonai
// tem conta de verdade) — usa o e-mail da própria conta, não deixa a
// pessoa digitar de novo nem arriscar comprar com e-mail errado.
// Mesmo padrão do Próspero JB IA: checkout amarrado em quem está logado.
router.post("/checkout", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const [pagamento] = await query(
      `INSERT INTO pagamentos (email, status, valor_centavos) VALUES ($1, 'pendente', $2) RETURNING id`,
      [usuario.email, PRECO_CENTAVOS]
    );

    const preferencia = await criarPreferencia({
      titulo: TITULO_PRODUTO,
      precoCentavos: PRECO_CENTAVOS,
      email: usuario.email,
      urlFrontend: urlFrontend(),
      urlBackend: urlBackend(),
      referenciaExterna: `PAGAMENTO:${pagamento.id}`,
    });

    res.json({ initPoint: preferencia.init_point });
  } catch (err) {
    console.error("Erro ao criar checkout:", err);
    res.status(500).json({ erro: "Erro ao criar link de pagamento.", detalhe: err.message });
  }
});

// Webhook do Mercado Pago — ele mesmo chama essa URL quando o status de
// um pagamento muda. NÃO tem login aqui, é o Mercado Pago quem bate.
router.post("/webhook", async (req, res) => {
  try {
    const tipo = req.query.type || req.body?.type;
    const paymentId = req.query["data.id"] || req.body?.data?.id;

    if (tipo !== "payment" || !paymentId) {
      return res.sendStatus(200); // notificação que não nos interessa — só confirma recebimento
    }

    const pagamentoMp = await buscarPagamento(paymentId);
    if (pagamentoMp.status !== "approved") return res.sendStatus(200);

    const referencia = String(pagamentoMp.external_reference || "");
    if (!referencia.startsWith("PAGAMENTO:")) return res.sendStatus(200);
    const pagamentoId = Number(referencia.split(":")[1]);

    await query(
      `UPDATE pagamentos SET status = 'aprovado', referencia_mercadopago = $1, aprovado_em = now()
       WHERE id = $2 AND status = 'pendente'`,
      [String(pagamentoMp.id), pagamentoId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro no webhook do Mercado Pago:", err);
    // Sempre responde 200 pro Mercado Pago não ficar reenviando a
    // notificação em loop — o erro já foi registrado no log acima.
    res.sendStatus(200);
  }
});

// Consulta se um e-mail já tem pagamento aprovado. GET /auth/eu já faz
// essa mesma checagem pra quem está logado (campo assinaturaAtiva) —
// essa rota fica como apoio pra telas que ainda não tem o token à mão.
router.get("/status", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ erro: "Informe o e-mail." });
    const [pago] = await query(
      `SELECT id FROM pagamentos WHERE email = $1 AND status = 'aprovado' LIMIT 1`,
      [email]
    );
    res.json({ pago: Boolean(pago) });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao consultar status.", detalhe: err.message });
  }
});

export default router;
