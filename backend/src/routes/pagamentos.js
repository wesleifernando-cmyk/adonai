import { Router } from "express";
import { query } from "../db/pool.js";
import { criarPreferencia, buscarPagamento } from "../services/mercadopago.js";

const router = Router();

// Preço único do acesso — R$9,90, à vista (Pix, crédito ou débito,
// escolhido pela própria pessoa na tela do Mercado Pago).
const PRECO_CENTAVOS = 990;
const TITULO_PRODUTO = "Acesso Adonai";

const urlFrontend = () => process.env.FRONTEND_URL || "http://localhost:5173";
const urlBackend = () => process.env.BACKEND_URL || "http://localhost:3002";

// Cria o link de pagamento. Não exige login (o Adonai ainda não tem
// sistema de conta) — só pede o e-mail, que é usado depois pra
// confirmar quem pagou.
router.post("/checkout", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ erro: "Informe um e-mail válido." });
    }

    const [pagamento] = await query(
      `INSERT INTO pagamentos (email, status, valor_centavos) VALUES ($1, 'pendente', $2) RETURNING id`,
      [email, PRECO_CENTAVOS]
    );

    const preferencia = await criarPreferencia({
      titulo: TITULO_PRODUTO,
      precoCentavos: PRECO_CENTAVOS,
      email,
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

// Consulta se um e-mail já tem pagamento aprovado — usado pela tela de
// "já paguei" pra liberar o acesso sem precisar de login de verdade
// ainda (isso entra na Fase 2, com conta/senha).
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
