import { Router } from "express";
import { query } from "../db/pool.js";
import { exigirLogin } from "./auth.js";
import { perguntarJson } from "../services/openai.js";
import { bancoBiblia, sortearOpcoes } from "../services/quiz-banco.js";

const router = Router();

const NIVEL_MAX = 15;

// Temas sorteados a cada pergunta. A Bíblia é a maioria (peso alto) pra
// variar e ser acessível aos jovens; concílios e história da Igreja
// entram raramente.
const TEMAS = [
  // Bíblia (≈ 65%)
  { peso: 5, tema: "Gênesis e os patriarcas (Adão, Noé, Abraão, Isaac, Jacó, José do Egito)" },
  { peso: 5, tema: "Êxodo, Moisés e a caminhada pelo deserto (pragas, Mar Vermelho, Dez Mandamentos, maná)" },
  { peso: 4, tema: "Josué e o livro dos Juízes (Gedeão, Sansão, Débora, Jefté)" },
  { peso: 4, tema: "Rute, Samuel, Saul e o rei Davi" },
  { peso: 3, tema: "Salomão, os livros dos Reis e a história dos reis de Israel e Judá" },
  { peso: 6, tema: "Os profetas (Isaías, Jeremias, Ezequiel, Daniel, Jonas, Elias, Eliseu, Amós, Oseias…)" },
  { peso: 3, tema: "Livros sapienciais e poéticos (Salmos, Provérbios, Jó, Eclesiastes, Sabedoria, Eclesiástico, Cântico dos Cânticos)" },
  { peso: 4, tema: "Quantos e quais livros tem a Bíblia: Antigo e Novo Testamento, Pentateuco, cânon católico e diferenças para a Bíblia protestante, deuterocanônicos" },
  { peso: 6, tema: "O Evangelho segundo Mateus (Sermão da Montanha, Bem-aventuranças, parábolas, Pai-Nosso)" },
  { peso: 4, tema: "O Evangelho segundo Marcos" },
  { peso: 5, tema: "O Evangelho segundo Lucas (Anunciação, Visitação, Natal, Bom Samaritano, Filho Pródigo)" },
  { peso: 5, tema: "O Evangelho segundo João (Bodas de Caná, Nicodemos, samaritana, Lázaro, 'Eu sou')" },
  { peso: 4, tema: "Milagres e parábolas de Jesus" },
  { peso: 4, tema: "Os doze apóstolos e os discípulos de Jesus" },
  { peso: 3, tema: "Paixão, morte e ressurreição de Jesus" },
  { peso: 4, tema: "Atos dos Apóstolos (Pentecostes, Estêvão, conversão de Paulo, viagens missionárias)" },
  { peso: 5, tema: "As cartas do Novo Testamento (Romanos, 1 e 2 Coríntios, Gálatas, Efésios, Filipenses, Tiago, Pedro, João, Hebreus…)" },
  { peso: 2, tema: "Apocalipse" },
  { peso: 3, tema: "Mulheres da Bíblia (Eva, Sara, Rute, Ester, Judite, Maria, Isabel, Maria Madalena…)" },
  // Fé católica no dia a dia (≈ 35%)
  { peso: 5, tema: "Os sete sacramentos" },
  { peso: 4, tema: "A Santa Missa e a liturgia (partes da Missa, tempos litúrgicos, cores, Quaresma, Advento)" },
  { peso: 4, tema: "Orações católicas (Pai-Nosso, Ave-Maria, Credo, Salve Rainha) e o Santo Rosário" },
  { peso: 5, tema: "Santos e santas conhecidos pelos jovens (vida e padroados)" },
  { peso: 3, tema: "Nossa Senhora e as devoções marianas (Aparecida, Lourdes, Fátima, Guadalupe)" },
  { peso: 3, tema: "Os Dez Mandamentos, as virtudes e os pecados capitais" },
  { peso: 2, tema: "Anjos e arcanjos, Espírito Santo, Santíssima Trindade" },
  { peso: 2, tema: "Papas e a vida da Igreja (de forma simples e conhecida)" },
  { peso: 1, tema: "Um concílio ou documento famoso da Igreja, explicado de forma simples" },
];

function sortearTema() {
  const total = TEMAS.reduce((n, t) => n + t.peso, 0);
  let r = Math.random() * total;
  for (const t of TEMAS) {
    r -= t.peso;
    if (r <= 0) return t.tema;
  }
  return TEMAS[0].tema;
}

// A dificuldade varia entre fácil e médio — nada de pergunta que ninguém
// sabe responder. O nível do jogador só empurra um pouco a proporção.
function sortearDificuldade(nivel) {
  const sobe = Math.min(nivel, NIVEL_MAX) / NIVEL_MAX; // 0..1
  const r = Math.random();
  const pFacil = 0.7 - 0.25 * sobe;
  const pMedio = pFacil + 0.27 + 0.1 * sobe;
  if (r < pFacil) return "FÁCIL: algo que um católico jovem, que vai à Missa e à catequese, sabe responder de bate-pronto";
  if (r < pMedio) return "MÉDIA: exige ter lido ou estudado um pouco, mas é conhecimento comum de quem frequenta a Igreja";
  return "UM POUCO MAIS DIFÍCIL: ainda assim, sobre assunto conhecido — nada obscuro nem de especialista";
}

const INSTRUCOES =
  "Você cria perguntas de múltipla escolha sobre a fé católica para jovens, em um app devocional, em português do Brasil. " +
  'Responda SEMPRE em JSON no formato {"pergunta": string, "opcoes": [4 strings], "resposta_correta": 0-3, "explicacao": string}. ' +
  "Regras: (1) pergunta curta, direta e clara, sem enrolação e sem introdução; (2) 4 opções curtas, só uma correta e as outras erradas de forma inequívoca, " +
  "sem pegadinha; (3) use os nomes que o povo católico usa: 'Bodas de Caná' (e não só 'Caná da Galileia'), 'Evangelho segundo Mateus', 'Sermão da Montanha', " +
  "'Pai-Nosso', 'Antigo e Novo Testamento'; (4) a Bíblia católica tem 73 livros (46 no Antigo Testamento e 27 no Novo); a protestante tem 66 (39 e 27); " +
  "(5) explicação curta (1-2 frases) com a referência bíblica (livro e capítulo) ou do Catecismo quando souber com certeza; " +
  "(6) NUNCA invente: use apenas fatos que você tem certeza absoluta. Cuidado redobrado com datas, números, autoria, fundadores e títulos de santos — " +
  "se não tiver certeza, troque por uma pergunta mais básica e segura sobre o mesmo tema.";

// Confere de forma independente se a resposta marcada como certa é mesmo
// a certa — se o modelo discordar de si mesmo, a pergunta é descartada.
async function respostaConfere(dados) {
  const v = await perguntarJson(
    [
      {
        role: "system",
        content:
          "Você é um revisor de teologia católica e de Bíblia. Receba uma pergunta com 4 opções e diga qual é a única correta. " +
          'Responda em JSON: {"resposta": 0-3, "tem_certeza": true|false, "problema": string}. ' +
          "Marque tem_certeza=false se a pergunta for ambígua, se mais de uma opção puder estar certa, se nenhuma estiver certa ou se você não tiver certeza do fato.",
      },
      {
        role: "user",
        content: `Pergunta: ${dados.pergunta}\n${dados.opcoes.map((o, i) => `${i}) ${o}`).join("\n")}`,
      },
    ],
    { temperatura: 0 }
  );
  return v.tem_certeza === true && Number(v.resposta) === dados.resposta_correta;
}

// Gera uma pergunta nova pro nível atual do usuário: sorteia o tema (Bíblia
// em maioria), às vezes usa o banco de perguntas feitas à mão, e evita
// repetir o que a pessoa já respondeu.
router.get("/pergunta", exigirLogin, async (req, res) => {
  try {
    let [pontuacao] = await query(`SELECT nivel FROM quiz_pontuacoes WHERE usuario_id = $1`, [req.usuario.id]);
    if (!pontuacao) {
      await query(`INSERT INTO quiz_pontuacoes (usuario_id) VALUES ($1)`, [req.usuario.id]);
      pontuacao = { nivel: 1 };
    }

    const historico = await query(
      `SELECT pergunta FROM quiz_perguntas WHERE usuario_id = $1 ORDER BY criado_em DESC LIMIT 400`,
      [req.usuario.id]
    );
    const jaFeitas = new Set(historico.map((h) => h.pergunta));
    const recentes = historico.slice(0, 40);

    let dados = null;

    // ~40% das vezes tenta o banco de perguntas de Bíblia feitas à mão.
    if (Math.random() < 0.4) {
      const disponiveis = bancoBiblia.filter((q) => !jaFeitas.has(q.pergunta));
      if (disponiveis.length) {
        dados = sortearOpcoes(disponiveis[Math.floor(Math.random() * disponiveis.length)]);
      }
    }

    // Senão (ou se o banco acabou pra essa pessoa), gera com a IA.
    for (let tentativa = 0; !dados && tentativa < 3; tentativa++) {
      const candidato = await perguntarJson(
        [
          { role: "system", content: INSTRUCOES },
          {
            role: "user",
            content:
              `Crie 1 pergunta sobre este tema: ${sortearTema()}. ` +
              `Dificuldade ${sortearDificuldade(pontuacao.nivel)}. ` +
              (recentes.length
                ? `Não repita nem faça variação destas perguntas já feitas a esta pessoa: ${recentes
                    .map((r) => `"${r.pergunta}"`)
                    .join("; ")}.`
                : ""),
          },
        ],
        { temperatura: 0.8 }
      );
      const ok =
        Array.isArray(candidato.opcoes) &&
        candidato.opcoes.length === 4 &&
        typeof candidato.resposta_correta === "number" &&
        candidato.resposta_correta >= 0 &&
        candidato.resposta_correta <= 3 &&
        typeof candidato.pergunta === "string" &&
        !jaFeitas.has(candidato.pergunta);
      if (ok && (await respostaConfere(candidato))) dados = candidato;
    }
    if (!dados) throw new Error("Não consegui gerar uma pergunta confiável agora. Tente de novo.");

    if (!Array.isArray(dados.opcoes) || dados.opcoes.length !== 4 || typeof dados.resposta_correta !== "number") {
      throw new Error("Formato inesperado da IA.");
    }

    const [salva] = await query(
      `INSERT INTO quiz_perguntas (usuario_id, pergunta, opcoes, resposta_correta, explicacao, nivel)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [req.usuario.id, dados.pergunta, JSON.stringify(dados.opcoes), dados.resposta_correta, dados.explicacao, pontuacao.nivel]
    );

    const resposta = { id: salva.id, pergunta: dados.pergunta, opcoes: dados.opcoes, nivel: pontuacao.nivel };
    // Só administradores recebem a resposta certa junto da pergunta (botão
    // "mostrar respostas" do quiz). Pra qualquer outra pessoa ela só aparece
    // depois de responder.
    const [quem] = await query(`SELECT admin FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (quem?.admin) {
      resposta.respostaCorreta = dados.resposta_correta;
      resposta.explicacao = dados.explicacao;
    }
    res.json(resposta);
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
    const [pontuacao] = await query(
      `SELECT pontos, nivel, acertos_seguidos, perguntas_corretas FROM quiz_pontuacoes WHERE usuario_id = $1`,
      [req.usuario.id]
    );

    let { pontos, nivel, acertos_seguidos: acertosSeguidos, perguntas_corretas: perguntasCorretas } = pontuacao;
    if (correta) {
      // cada pergunta vale mais pontos quanto mais difícil (nível) ela for
      pontos += 10 * pergunta.nivel;
      acertosSeguidos += 1;
      perguntasCorretas += 1; // nunca tem teto — é o número que sobe pra sempre no ranking
      if (acertosSeguidos % 3 === 0 && nivel < NIVEL_MAX) nivel += 1;
    } else {
      // errar não avança: não ganha ponto, não sobe de nível, não sobe no ranking
      acertosSeguidos = 0;
      if (nivel > 1) nivel -= 1;
    }

    await query(
      `UPDATE quiz_pontuacoes
       SET pontos = $1, nivel = $2, acertos_seguidos = $3, perguntas_corretas = $4, atualizado_em = now()
       WHERE usuario_id = $5`,
      [pontos, nivel, acertosSeguidos, perguntasCorretas, req.usuario.id]
    );

    res.json({
      correta,
      respostaCorreta: pergunta.resposta_correta,
      explicacao: pergunta.explicacao,
      pontosTotais: pontos,
      nivel,
      perguntasCorretas,
    });
  } catch (err) {
    console.error("Erro ao responder pergunta:", err);
    res.status(500).json({ erro: "Erro ao registrar resposta.", detalhe: err.message });
  }
});

router.get("/ranking", exigirLogin, async (req, res) => {
  try {
    // Ordenado por pontos — é o critério de verdade, porque pergunta
    // difícil vale mais ponto. Quem acertou menos perguntas mas mais
    // difíceis pode (e deve) ficar na frente de quem acertou muita
    // pergunta fácil. "Pergunta X" continua exibido, só não é o critério.
    const ranking = await query(`
      SELECT u.nome, p.pontos, p.nivel, p.perguntas_corretas
      FROM quiz_pontuacoes p
      JOIN usuarios u ON u.id = p.usuario_id
      WHERE p.pontos > 0
      ORDER BY p.pontos DESC, p.perguntas_corretas DESC
      LIMIT 20
    `);
    const [minhaPontuacao] = await query(
      `SELECT pontos, nivel, perguntas_corretas FROM quiz_pontuacoes WHERE usuario_id = $1`,
      [req.usuario.id]
    );
    res.json({ ranking, minhaPontuacao: minhaPontuacao || { pontos: 0, nivel: 1, perguntas_corretas: 0 } });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar ranking.", detalhe: err.message });
  }
});

export default router;
