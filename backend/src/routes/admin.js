import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirAdmin } from "./auth.js";

const router = Router();

// Lista todos os usuários com nome, e-mail, se é admin/bloqueado e o
// status de acesso (liberado/pago antigo, assinatura recorrente, ou
// nenhum) — pra ver quem está pagando de verdade e quem não está.
router.get("/usuarios", exigirAdmin, async (req, res) => {
  try {
    const usuarios = await query(`
      SELECT
        u.id, u.nome, u.email, u.admin, u.bloqueado, u.criado_em,
        EXISTS (
          SELECT 1 FROM pagamentos p WHERE p.email = u.email AND p.status = 'aprovado'
        ) AS liberado_ou_pago_antigo,
        (
          SELECT a.status FROM assinaturas a
          WHERE a.email = u.email
          ORDER BY a.criado_em DESC LIMIT 1
        ) AS assinatura_status
      FROM usuarios u
      ORDER BY u.criado_em DESC
    `);
    const comAcesso = usuarios.map((u) => ({
      ...u,
      assinatura_ativa: u.liberado_ou_pago_antigo || u.assinatura_status === "authorized",
    }));
    res.json({ usuarios: comAcesso });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar usuários.", detalhe: err.message });
  }
});

// Libera acesso de graça pra um usuário, sem cobrar — cria um
// "pagamento" aprovado de R$0, do mesmo jeito que o checkout real cria
// um aprovado quando o Mercado Pago confirma.
router.post("/usuarios/:id/liberar", exigirAdmin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT email FROM usuarios WHERE id = $1`, [req.params.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    await query(
      `INSERT INTO pagamentos (email, status, valor_centavos, aprovado_em) VALUES ($1, 'aprovado', 0, now())`,
      [usuario.email]
    );
    res.json({ ok: true });
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

export default router;
