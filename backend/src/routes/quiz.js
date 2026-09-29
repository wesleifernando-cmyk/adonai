import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirLogin } from "./auth.js";
import { perguntarJson } from "../services/openai.js";

const router = Router();

const NIVEL_MAX = 15;

function descreverNivel(nivel) {
  if (nivel <= 3) return "fácil — fatos bíblicos bem conhecidos, orações do dia a dia, personagens e histórias populares";
  if (nivel <= 6) return "médio — Catecismo da Igreja, sacramentos, tempos litúrgicos, vidas de santos conhecidos";
  if (nivel <= 10) return "difícil — teologia mais fina, história da Igreja, concílios, heresias, distinções doutrinárias";
  return "muito difícil — documentos pontifícios, Padres da Igreja, latim litúrgico, teologia dogmática avançada";
}

// Gera uma pergunta nova pro nível atual do usuário, evitando repetir
// as últimas perguntas feitas a ele.
router.get("/pergunta", exigirLogin, async (req, res) => {
  try {
    let [pontuacao] = await query(`SELECT nivel FROM quiz_pontuacoes WHERE usuario_id = $1`, [req.usuario.id]);
    if (!pontuacao) {
      await query(`INSERT INTO quiz_pontuacoes (usuario_id) VALUES ($1)`, [req.usuario.id]);
      pontuacao = { nivel: 1 };
    }

    const recentes = await query(
      `SELECT pergunta FROM quiz_perguntas WHERE usuario_id = $1 ORDER BY criado_em DESC LIMIT 12`,
      [req.usuario.id]
    );

    const dados = await perguntarJson([
      {
        role: "system",
        content:
          "Você cria perguntas de múltipla escolha sobre fé católica (Bíblia, Catecismo, santos, " +
          "liturgia, história da Igreja) para um app devocional. Responda SEMPRE em JSON no formato " +
          '{"pergunta": string, "opcoes": [4 strings], "resposta_correta": 0-3, "explicacao": string}. ' +
          "A explicação deve ser curta (1-2 frases) e citar a fonte quando possível (livro/capítulo, " +
          "parágrafo do Catecismo, etc). As 4 opções devem ser plausíveis, só uma correta. Nunca invente " +
          "doutrina — se não tiver certeza, prefira um fato mais básico e seguro.",
      },
      {
        role: "user",
        content:
          `Crie 1 pergunta de nível ${descreverNivel(pontuacao.nivel)}. ` +
          (recentes.length
            ? `Não repita (nem de forma parecida) estas perguntas já feitas: ${recentes
                .map((r) => `"${r.pergunta}"`)
                .join("; ")}.`
            : ""),
      },
    ]);

    if (!Array.isArray(dados.opcoes) || dados.opcoes.length !== 4 || typeof dados.resposta_correta !== "number") {
      throw new Error("Formato inesperado da IA.");
    }

    const [salva] = await query(
      `INSERT INTO quiz_perguntas (usuario_id, pergunta, opcoes, resposta_correta, explicacao, nivel)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [req.usuario.id, dados.pergunta, JSON.stringify(dados.opcoes), dados.resposta_correta, dados.explicacao, pontuacao.nivel]
    );

    res.json({ id: salva.id, pergunta: dados.pergunta, opcoes: dados.opcoes, nivel: pontuacao.nivel });
  } catch (err) {
    console.error("Erro ao gerar pergunta:", err);
    res.status(500).json({ erro: "Erro ao gerar pergunta.", detalhe: err.message });
  }
});

router.post("/responder", exigirLogin, async (req, res) => {
  try {
    const { perguntaId, opcaoEscolhida } = req.body;
    const [pergunta] = await query(
      `SELECT id, usuario_id, resposta_correta, explicacao, nivel, respondida FROM quiz_perguntas WHERE id = $1`,
      [perguntaId]
    );
    if (!pergunta || pergunta.usuario_id !== req.usuario.id) {
      return res.status(404).json({ erro: "Pergunta não encontrada." });
    }
    if (pergunta.respondida) {
      return res.status(409).json({ erro: "Essa pergunta já foi respondida." });
    }

    await query(`UPDATE quiz_perguntas SET respondida = true WHERE id = $1`, [pergunta.id]);

    const correta = Number(opcaoEscolhida) === pergunta.resposta_correta;
    const [pontuacao] = await query(`SELECT pontos, nivel, acertos_seguidos FROM quiz_pontuacoes WHERE usuario_id = $1`, [
      req.usuario.id,
    ]);

    let { pontos, nivel, acertos_seguidos: acertosSeguidos } = pontuacao;
    if (correta) {
      pontos += 10 * pergunta.nivel;
      acertosSeguidos += 1;
      if (acertosSeguidos % 3 === 0 && nivel < NIVEL_MAX) nivel += 1;
    } else {
      acertosSeguidos = 0;
      if (nivel > 1) nivel -= 1;
    }

    await query(
      `UPDATE quiz_pontuacoes SET pontos = $1, nivel = $2, acertos_seguidos = $3, atualizado_em = now() WHERE usuario_id = $4`,
      [pontos, nivel, acertosSeguidos, req.usuario.id]
    );

    res.json({
      correta,
      respostaCorreta: pergunta.resposta_correta,
      explicacao: pergunta.explicacao,
      pontosTotais: pontos,
      nivel,
    });
  } catch (err) {
    console.error("Erro ao responder pergunta:", err);
    res.status(500).json({ erro: "Erro ao registrar resposta.", detalhe: err.message });
  }
});

router.get("/ranking", exigirLogin, async (req, res) => {
  try {
    const ranking = await query(`
      SELECT u.nome, p.pontos, p.nivel
      FROM quiz_pontuacoes p
      JOIN usuarios u ON u.id = p.usuario_id
      WHERE p.pontos > 0
      ORDER BY p.pontos DESC
      LIMIT 20
    `);
    const [minhaPontuacao] = await query(`SELECT pontos, nivel FROM quiz_pontuacoes WHERE usuario_id = $1`, [
      req.usuario.id,
    ]);
    res.json({ ranking, minhaPontuacao: minhaPontuacao || { pontos: 0, nivel: 1 } });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar ranking.", detalhe: err.message });
  }
});

export default router;
