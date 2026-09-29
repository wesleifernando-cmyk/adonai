import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirLogin } from "./auth.js";
import { perguntarTexto } from "../services/openai.js";

const router = Router();

const PROMPT_SISTEMA =
  "Você é o 'Católico Responde' do app Adonai, um assistente que ajuda católicos a entender e " +
  "viver a própria fé. Responda com acolhida, clareza e fidelidade ao Magistério da Igreja " +
  "Católica (Catecismo, Sagrada Escritura, Tradição). Sempre que possível, cite a fonte (parágrafo " +
  "do Catecismo, livro e capítulo da Bíblia, documento). Seja breve e direto (no máximo uns 3 " +
  "parágrafos curtos). Para questões morais delicadas, pastorais ou de foro íntimo, incentive a " +
  "buscar um padre ou diretor espiritual, sem deixar de dar uma orientação geral fiel à doutrina. " +
  "Nunca contradiga o ensino oficial da Igreja Católica.";

router.post("/perguntar", exigirLogin, async (req, res) => {
  try {
    const { pergunta } = req.body;
    if (!pergunta || pergunta.trim().length < 3) {
      return res.status(400).json({ erro: "Escreva sua pergunta primeiro." });
    }

    const resposta = await perguntarTexto([
      { role: "system", content: PROMPT_SISTEMA },
      { role: "user", content: pergunta.trim() },
    ]);

    await query(
      `INSERT INTO catolico_responde_historico (usuario_id, pergunta, resposta) VALUES ($1, $2, $3)`,
      [req.usuario.id, pergunta.trim(), resposta]
    );

    res.json({ resposta });
  } catch (err) {
    console.error("Erro no Católico Responde:", err);
    res.status(500).json({ erro: "Erro ao consultar a IA.", detalhe: err.message });
  }
});

router.get("/historico", exigirLogin, async (req, res) => {
  try {
    const historico = await query(
      `SELECT id, pergunta, resposta, criado_em FROM catolico_responde_historico
       WHERE usuario_id = $1 ORDER BY criado_em DESC LIMIT 30`,
      [req.usuario.id]
    );
    res.json({ historico });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar histórico.", detalhe: err.message });
  }
});

export default router;
