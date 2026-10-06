import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirAdmin } from "./auth.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { registrarAcessoComPrazo } from "../services/assinatura.js";

const PRECO_CENTAVOS = 599;

const router = Router();

// Lista todos os usuários com nome, e-mail, se é admin/bloqueado e a
// situação do acesso: cartão (mensal automático), avulso com prazo
// (Pix/débito/crédito ou liberação manual), sem vencimento (grátis /
// pagamento antigo) ou nenhum — com a data de vencimento e os dias que
// faltam, pra você ver quem está por vencer.
router.get("/usuarios", exigirAdmin, async (req, res) => {
  try {
    const usuarios = await query(`
      SELECT
        u.id, u.nome, u.email, u.telefone, u.admin, u.bloqueado, u.criado_em,
        EXISTS (
          SELECT 1 FROM pagamentos p
          WHERE p.email = u.email AND p.status = 'aprovado' AND p.valido_ate IS NULL
        ) AS sem_vencimento,
        (
          SELECT MAX(p.valido_ate) FROM pagamentos p
          WHERE p.email = u.email AND p.status = 'aprovado' AND p.valido_ate IS NOT NULL
        ) AS valido_ate,
        (
          SELECT MAX(p.aprovado_em) FROM pagamentos p
          WHERE p.email = u.email AND p.status = 'aprovado' AND p.valor_centavos > 0
        ) AS ultimo_pagamento_em,
        (
          SELECT a.status FROM assinaturas a
          WHERE a.email = u.email
          ORDER BY a.criado_em DESC LIMIT 1
        ) AS assinatura_status
      FROM usuarios u
      ORDER BY u.criado_em DESC
    `);
    const agora = Date.now();
    const comAcesso = usuarios.map((u) => {
      const ate = u.valido_ate ? new Date(u.valido_ate).getTime() : null;
      const vigente = ate !== null && ate > agora;
      let acesso_tipo = null;
      if (u.assinatura_status === "authorized") acesso_tipo = "cartao";
      else if (u.sem_vencimento) acesso_tipo = "sem_vencimento";
      else if (vigente) acesso_tipo = "avulso";
      return {
        ...u,
        assinatura_ativa: Boolean(acesso_tipo),
        acesso_tipo,
        dias_restantes: acesso_tipo === "avulso" ? Math.ceil((ate - agora) / 86_400_000) : null,
        venceu_em: !acesso_tipo && ate ? u.valido_ate : null,
      };
    });
    res.json({ usuarios: comAcesso });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar usuários.", detalhe: err.message });
  }
});

// Libera acesso manualmente. Dois jeitos:
//  - { dias: 30, pago: true }  → pessoa pagou por fora (ex.: Pix direto pra você):
//    libera 30 dias a partir de agora (ou soma ao que ainda resta) e registra R$5,99.
//    Passados os dias, o acesso corta sozinho e ela precisa pagar de novo.
//  - { dias: null }            → libera de graça, sem vencimento.
router.post("/usuarios/:id/liberar", exigirAdmin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.params.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const dias = req.body?.dias === undefined ? null : req.body.dias;
    if (dias === null) {
      await query(
        `INSERT INTO pagamentos (email, status, valor_centavos, aprovado_em, origem) VALUES ($1, 'aprovado', 0, now(), 'gratis')`,
        [usuario.email]
      );
      return res.json({ ok: true, validoAte: null });
    }

    const n = Number(dias);
    if (!Number.isInteger(n) || n < 1 || n > 366) {
      return res.status(400).json({ erro: "Informe de 1 a 366 dias." });
    }
    const validoAte = await registrarAcessoComPrazo({
      email: usuario.email,
      dias: n,
      valorCentavos: req.body?.pago ? PRECO_CENTAVOS : 0,
      origem: "manual",
    });
    res.json({ ok: true, validoAte });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao liberar acesso.", detalhe: err.message });
  }
});

router.post("/usuarios/:id/bloquear", exigirAdmin, async (req, res) => {
  try {
    await query(`UPDATE usuarios SET bloqueado = true WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao bloquear usuário.", detalhe: err.message });
  }
});

router.post("/usuarios/:id/desbloquear", exigirAdmin, async (req, res) => {
  try {
    await query(`UPDATE usuarios SET bloqueado = false WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao desbloquear usuário.", detalhe: err.message });
  }
});

// Torna outro usuário administrador (pra você poder colocar o Sandro,
// a Bárbara etc.). Só quem já é admin consegue chamar essa rota.
router.post("/usuarios/:id/tornar-admin", exigirAdmin, async (req, res) => {
  try {
    await query(`UPDATE usuarios SET admin = true WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao tornar administrador.", detalhe: err.message });
  }
});

router.post("/usuarios/:id/remover-admin", exigirAdmin, async (req, res) => {
  try {
    await query(`UPDATE usuarios SET admin = false WHERE id = $1`, [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover administrador.", detalhe: err.message });
  }
});

// Exclui a conta de um usuário (e tudo que é dele: pontuação do quiz,
// leitura, histórico). Não deixa excluir a si mesmo nem outro administrador,
// e barra quem tem assinatura no cartão ativa — nesse caso o Mercado Pago
// continuaria cobrando, então cancele lá antes. Os registros de pagamento
// ficam guardados (histórico financeiro, casados pelo e-mail).
router.delete("/usuarios/:id", exigirAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id === req.usuario.id) {
      return res.status(400).json({ erro: "Você não pode excluir a sua própria conta." });
    }
    const [alvo] = await query(`SELECT id, email, admin FROM usuarios WHERE id = $1`, [id]);
    if (!alvo) return res.status(404).json({ erro: "Usuário não encontrado." });
    if (alvo.admin) {
      return res.status(400).json({ erro: "Remova o acesso de administrador antes de excluir essa conta." });
    }
    const [cartao] = await query(
      `SELECT id FROM assinaturas WHERE usuario_id = $1 AND status = 'authorized' LIMIT 1`,
      [id]
    );
    if (cartao) {
      return res.status(409).json({
        erro: "Essa pessoa tem assinatura ativa no cartão. Cancele a assinatura no Mercado Pago antes de excluir, senão a cobrança continua.",
      });
    }
    await query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir usuário.", detalhe: err.message });
  }
});

// Cria uma senha provisória pra quem esqueceu a senha. Devolve a senha
// UMA vez, pra você mandar pra pessoa; ela entra e depois pode trocar.
// Mantém pontuação, progresso e acesso da conta (diferente de excluir).
router.post("/usuarios/:id/redefinir-senha", exigirAdmin, async (req, res) => {
  try {
    const [alvo] = await query(`SELECT id FROM usuarios WHERE id = $1`, [req.params.id]);
    if (!alvo) return res.status(404).json({ erro: "Usuário não encontrado." });
    const alfabeto = "abcdefghjkmnpqrstuvwxyz23456789"; // sem letras/números que se confundem
    const senhaNova = Array.from(crypto.randomBytes(8), (b) => alfabeto[b % alfabeto.length]).join("");
    await query(`UPDATE usuarios SET senha_hash = $1 WHERE id = $2`, [await bcrypt.hash(senhaNova, 10), alvo.id]);
    res.json({ ok: true, senhaProvisoria: senhaNova });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao redefinir a senha.", detalhe: err.message });
  }
});

export default router;
