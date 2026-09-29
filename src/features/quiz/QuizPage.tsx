import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import { compartilharImagemRank } from "../../lib/compartilharRank";
import styles from "./QuizPage.module.css";

type Pergunta = { id: number; pergunta: string; opcoes: string[]; nivel: number };
type Resultado = {
  correta: boolean;
  respostaCorreta: number;
  explicacao: string;
  pontosTotais: number;
  nivel: number;
  perguntasCorretas: number;
};
type LinhaRanking = { nome: string; pontos: number; nivel: number; perguntas_corretas: number };
type MinhaPontuacao = { pontos: number; nivel: number; perguntas_corretas: number };

export function QuizPage() {
  const { usuario } = useAuth();
  const [pergunta, setPergunta] = useState<Pergunta | null>(null);
  const [compartilhando, setCompartilhando] = useState(false);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [ranking, setRanking] = useState<LinhaRanking[] | null>(null);
  const [minhaPontuacao, setMinhaPontuacao] = useState<MinhaPontuacao>({ pontos: 0, nivel: 1, perguntas_corretas: 0 });

  async function carregarRanking() {
    try {
      const dados = await apiFetch<{ ranking: LinhaRanking[]; minhaPontuacao: MinhaPontuacao }>("/quiz/ranking");
      setRanking(dados.ranking);
      setMinhaPontuacao(dados.minhaPontuacao);
    } catch {
      // ranking é acessório — se falhar, a pergunta ainda funciona
    }
  }

  async function novaPergunta() {
    setErro(null);
    setResultado(null);
    setEscolha(null);
    setCarregando(true);
    try {
      const dados = await apiFetch<Pergunta>("/quiz/pergunta");
      setPergunta(dados);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao buscar pergunta.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    novaPergunta();
    carregarRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function responder(indice: number) {
    if (!pergunta || resultado) return;
    setEscolha(indice);
    setErro(null);
    try {
      const dados = await apiFetch<Resultado>("/quiz/responder", {
        method: "POST",
        body: JSON.stringify({ perguntaId: pergunta.id, opcaoEscolhida: indice }),
      });
      setResultado(dados);
      carregarRanking();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao registrar resposta.");
    }
  }

  async function compartilhar() {
    setCompartilhando(true);
    try {
      await compartilharImagemRank({
        nome: usuario?.nome || "Alguém da Missão",
        pontos: minhaPontuacao.pontos,
        perguntaAtual: minhaPontuacao.perguntas_corretas + 1,
      });
    } catch {
      // usuário cancelou o share ou o navegador não deixou — sem problema
    } finally {
      setCompartilhando(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Quiz católico"
        title="Aprender jogando"
        lead="Perguntas geradas na hora, começando fácil e ficando mais difíceis conforme você acerta."
      />

      <div className={styles.placar}>
        <div className={styles.stat}>
          <p className={styles.statNum}>{minhaPontuacao.perguntas_corretas + 1}</p>
          <p className={styles.statLabel}>Sua pergunta</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNum}>{minhaPontuacao.pontos}</p>
          <p className={styles.statLabel}>Pontos</p>
        </div>
      </div>

      <button className={styles.compartilhar} onClick={compartilhar} disabled={compartilhando}>
        {compartilhando ? "Gerando imagem…" : "📤 Compartilhar meu resultado"}
      </button>

      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.cartao}>
        {carregando && !pergunta && <p>Preparando sua pergunta…</p>}

        {pergunta && (
          <>
            <p className={styles.pergunta}>{pergunta.pergunta}</p>
            <div className={styles.opcoes}>
              {pergunta.opcoes.map((opcao, i) => {
                let classe = styles.opcao;
                if (resultado) {
                  if (i === resultado.respostaCorreta) classe = `${styles.opcao} ${styles.opcaoCorreta}`;
                  else if (i === escolha) classe = `${styles.opcao} ${styles.opcaoErrada}`;
                }
                return (
                  <button key={i} className={classe} disabled={Boolean(resultado)} onClick={() => responder(i)}>
                    {opcao}
                  </button>
                );
              })}
            </div>

            {resultado && (
              <div className={styles.resultado}>
                <p className={`${styles.resultadoTitulo} ${resultado.correta ? styles.resultadoOk : styles.resultadoErro}`}>
                  {resultado.correta ? "Acertou!" : "Não foi dessa vez."}
                </p>
                <p>{resultado.explicacao}</p>
              </div>
            )}

            <button className={styles.proxima} disabled={!resultado || carregando} onClick={novaPergunta}>
              Próxima pergunta
            </button>
          </>
        )}
      </div>

      {ranking && ranking.length > 0 && (
        <div className={styles.ranking}>
          <h2 className={styles.rankingTitulo}>Ranking</h2>
          <div className={styles.rankingLista}>
            {ranking.map((r, i) => (
              <div key={i} className={styles.rankingLinha}>
                <span>
                  <span className={styles.rankingPos}>{i + 1}.</span>
                  {r.nome}
                </span>
                <span>
                  pergunta {r.perguntas_corretas + 1} · {r.pontos} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
