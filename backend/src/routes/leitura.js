import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirLogin } from "./auth.js";

const router = Router();

// Progresso + grifos salvos do usuário logado pra um livro específico.
router.get("/:slug", exigirLogin, async (req, res) => {
  try {
    const { slug } = req.params;
    const [progresso] = await query(
      `SELECT pagina_atual FROM leitura_progresso WHERE usuario_id = $1 AND livro_slug = $2`,
      [req.usuario.id, slug]
    );
    const marcacoes = await query(
      `SELECT id, pagina, trecho, criado_em FROM leitura_marcacoes
       WHERE usuario_id = $1 AND livro_slug = $2 ORDER BY pagina ASC, criado_em ASC`,
      [req.usuario.id, slug]
    );
    res.json({ paginaAtual: progresso?.pagina_atual || 1, marcacoes });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar leitura.", detalhe: err.message });
  }
});

router.post("/:slug/pagina", exigirLogin, async (req, res) => {
  try {
    const { slug } = req.params;
    const { pagina } = req.body;
    if (!Number.isInteger(pagina) || pagina < 1) {
      return res.status(400).json({ erro: "Página inválida." });
    }
    await query(
      `INSERT INTO leitura_progresso (usuario_id, livro_slug, pagina_atual)
       VALUES ($1, $2, $3)
       ON CONFLICT (usuario_id, livro_slug) DO UPDATE SET pagina_atual = $3, atualizado_em = now()`,
      [req.usuario.id, slug, pagina]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar página.", detalhe: err.message });
  }
});

router.post("/:slug/marcacao", exigirLogin, async (req, res) => {
  try {
    const { slug } = req.params;
    const { pagina, trecho } = req.body;
    if (!Number.isInteger(pagina) || pagina < 1 || !trecho?.trim()) {
      return res.status(400).json({ erro: "Informe a página e o trecho." });
    }
    const [marcacao] = await query(
      `INSERT INTO leitura_marcacoes (usuario_id, livro_slug, pagina, trecho)
       VALUES ($1, $2, $3, $4) RETURNING id, pagina, trecho, criado_em`,
      [req.usuario.id, slug, pagina, trecho.trim().slice(0, 2000)]
    );
    res.status(201).json({ marcacao });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar trecho.", detalhe: err.message });
  }
});

router.delete("/:slug/marcacao/:id", exigirLogin, async (req, res) => {
  try {
    await query(`DELETE FROM leitura_marcacoes WHERE id = $1 AND usuario_id = $2`, [
      req.params.id,
      req.usuario.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover trecho.", detalhe: err.message });
  }
});

export default router;
