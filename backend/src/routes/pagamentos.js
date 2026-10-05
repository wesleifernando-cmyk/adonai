import { Router } from "express";
import { query } from "../db/pool.js";
import {
  criarAssinatura,
  buscarAssinatura,
  criarPreferencia,
  buscarPagamento,
  buscarPagamentosPorReferencia,
} from "../services/mercadopago.js";
import { exigirLogin } from "./auth.js";
import { acessoDe, assinaturaAtivaPara, registrarAcessoComPrazo, DIAS_ACESSO } from "../services/assinatura.js";

const router = Router();

// Assinatura mensal recorrente — R$5,99/mês, cobrada automaticamente
// todo mês no cartão de crédito que a pessoa cadastrar (o Mercado Pago
// não recorre Pix/débito sozinho, só cartão). Quem quiser pagar no Pix,
// débito ou crédito avulso usa /checkout-avulso: vale 30 dias.
const PRECO_CENTAVOS = 599;

const urlFrontend = () => process.env.FRONTEND_URL || "http://localhost:5173";
const urlBackend = () => process.env.BACKEND_URL || "https://adonai-production-7dcf.up.railway.app";

// Cada usuário usa sempre a mesma referência nos pagamentos avulsos, pra
// dar pra procurar tudo que ele já pagou.
const refAvulso = (usuarioId) => `AVULSO:${usuarioId}`;

// Pagamento avulso: Pix, cartão de crédito ou débito (tela de pagamento do
// Mercado Pago). Libera 30 dias; depois a pessoa paga de novo.
router.post("/checkout-avulso", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const preferencia = await criarPreferencia({
      titulo: `Missão Adonai — ${DIAS_ACESSO} dias de acesso`,
      precoCentavos: PRECO_CENTAVOS,
      email: usuario.email,
      urlFrontend: urlFrontend(),
      urlBackend: urlBackend(),
      referenciaExterna: refAvulso(req.usuario.id),
      retorno: {
        success: `${urlFrontend()}/assinar?retorno=ok`,
        failure: `${urlFrontend()}/assinar?retorno=falhou`,
        pending: `${urlFrontend()}/assinar?retorno=pendente`,
      },
    });
    res.json({ initPoint: preferencia.init_point });
  } catch (err) {
    console.error("Erro ao criar pagamento avulso:", err);
    res.status(500).json({ erro: "Erro ao iniciar o pagamento.", detalhe: err.message });
  }
});

// Confere um pagamento do Mercado Pago e, se aprovado e nosso, libera 30
// dias (uma única vez por pagamento — referencia_mercadopago é única).
async function processarPagamentoAvulso(pagamento) {
  if (!pagamento || pagamento.status !== "approved") return false;
  const ref = String(pagamento.external_reference || "");
  if (!ref.startsWith("AVULSO:")) return false;
  const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [Number(ref.slice(7))]);
  if (!usuario) return false;
  await registrarAcessoComPrazo({
    email: usuario.email,
    dias: DIAS_ACESSO,
    valorCentavos: Math.round(Number(pagamento.transaction_amount || 0) * 100) || PRECO_CENTAVOS,
    origem: "mercadopago",
    referencia: `MP:${pagamento.id}`,
  });
  return true;
}

// Cria a assinatura pro usuário já logado, usando o e-mail da própria
// conta. Devolve o link pra pessoa autorizar a cobrança recorrente.
router.post("/checkout", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const [assinaturaLocal] = await query(
      `INSERT INTO assinaturas (usuario_id, email, status, valor_centavos) VALUES ($1, $2, 'pending', $3) RETURNING id`,
      [req.usuario.id, usuario.email, PRECO_CENTAVOS]
    );

    const assinaturaMp = await criarAssinatura({
      precoCentavos: PRECO_CENTAVOS,
      email: usuario.email,
      urlFrontend: urlFrontend(),
      referenciaExterna: `ASSINATURA:${assinaturaLocal.id}`,
    });

    await query(`UPDATE assinaturas SET mp_preapproval_id = $1 WHERE id = $2`, [
      assinaturaMp.id,
      assinaturaLocal.id,
    ]);

    res.json({ initPoint: assinaturaMp.init_point });
  } catch (err) {
    console.error("Erro ao criar assinatura:", err);
    res.status(500).json({ erro: "Erro ao criar a assinatura.", detalhe: err.message });
  }
});

// Webhook do Mercado Pago — chamado sozinho quando o status de uma
// assinatura muda (autorizada, pausada, cancelada). Sem login aqui, é
// o Mercado Pago quem bate.
router.post("/webhook", async (req, res) => {
  try {
    const tipo = req.query.type || req.body?.type;
    const preapprovalId = req.query["data.id"] || req.body?.data?.id;

    if (tipo === "payment" && preapprovalId) {
      await processarPagamentoAvulso(await buscarPagamento(preapprovalId));
      return res.sendStatus(200);
    }

    if (tipo !== "subscription_preapproval" || !preapprovalId) {
      return res.sendStatus(200); // notificação que não nos interessa — só confirma recebimento
    }

    const assinaturaMp = await buscarAssinatura(preapprovalId);

    await query(
      `UPDATE assinaturas SET status = $1, atualizado_em = now() WHERE mp_preapproval_id = $2`,
      [assinaturaMp.status, String(preapprovalId)]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro no webhook do Mercado Pago:", err);
    // Sempre responde 200 pro Mercado Pago não ficar reenviando a
    // notificação em loop — o erro já foi registrado no log acima.
    res.sendStatus(200);
  }
});

// Confere na hora com o Mercado Pago se a assinatura pendente da pessoa
// já foi autorizada — usado pelo botão "Já paguei, verificar", sem
// precisar esperar o webhook chegar.
router.post("/verificar", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.usuario.id]);
    const pendentes = await query(
      `SELECT id, mp_preapproval_id FROM assinaturas
       WHERE usuario_id = $1 AND status != 'authorized' AND mp_preapproval_id IS NOT NULL
       ORDER BY criado_em DESC LIMIT 5`,
      [req.usuario.id]
    );

    for (const pendente of pendentes) {
      const assinaturaMp = await buscarAssinatura(pendente.mp_preapproval_id);
      await query(`UPDATE assinaturas SET status = $1, atualizado_em = now() WHERE id = $2`, [
        assinaturaMp.status,
        pendente.id,
      ]);
    }

    // Também procura Pix/débito/crédito avulso já aprovado e ainda não registrado.
    try {
      for (const pg of await buscarPagamentosPorReferencia(refAvulso(req.usuario.id))) {
        await processarPagamentoAvulso(pg);
      }
    } catch (e) {
      console.error("Erro ao conferir pagamentos avulsos:", e.message);
    }

    const acesso = await acessoDe(usuario.email);
    res.json({ assinaturaAtiva: acesso.ativo, acesso });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao verificar assinatura.", detalhe: err.message });
  }
});

// Consulta se um e-mail tem acesso ativo (pagamento antigo ou
// assinatura recorrente). GET /auth/eu já faz essa mesma checagem pra
// quem está logado — essa rota fica de apoio.
router.get("/status", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ erro: "Informe o e-mail." });
    res.json({ pago: await assinaturaAtivaPara(email) });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao consultar status.", detalhe: err.message });
  }
});

export default router;
