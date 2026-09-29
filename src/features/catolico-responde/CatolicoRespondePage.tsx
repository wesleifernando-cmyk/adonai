import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { falarEmVoz, ouvirFala, reconhecimentoDisponivel, sinteseDisponivel } from "../../lib/voz";
import styles from "./CatolicoRespondePage.module.css";

type ItemHistorico = { id: number; pergunta: string; resposta: string; criado_em: string };

export function CatolicoRespondePage() {
  const [pergunta, setPergunta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [ouvindo, setOuvindo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);

  const temMicrofone = reconhecimentoDisponivel();
  const temLeitura = sinteseDisponivel();

  async function carregarHistorico() {
    try {
      const dados = await apiFetch<{ historico: ItemHistorico[] }>("/catolico-responde/historico");
      setHistorico(dados.historico);
    } catch {
      // histórico é acessório
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!pergunta.trim()) return;
    setErro(null);
    setEnviando(true);
    try {
      const dados = await apiFetch<{ resposta: string }>("/catolico-responde/perguntar", {
        method: "POST",
        body: JSON.stringify({ pergunta }),
      });
      setPergunta("");
      await carregarHistorico();
      if (temLeitura) falarEmVoz(dados.resposta);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao consultar a IA.");
    } finally {
      setEnviando(false);
    }
  }

  function aoClicarMicrofone() {
    setErro(null);
    setOuvindo(true);
    ouvirFala(
      (texto) => {
        setPergunta((atual) => (atual ? `${atual} ${texto}` : texto));
        setOuvindo(false);
      },
      (msg) => {
        setErro(msg);
        setOuvindo(false);
      }
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Católico Responde"
        title="Tire sua dúvida da fé"
        lead="Pergunte sobre Bíblia, Catecismo, santos ou qualquer dúvida da fé católica — por texto ou por áudio."
      />

      <form className={styles.campo} onSubmit={enviar}>
        <div className={styles.campoTexto}>
          <textarea
            className={styles.textarea}
            placeholder="Ex: Por que os católicos rezam pelos mortos?"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
          />
          {temMicrofone && (
            <button
              type="button"
              className={`${styles.microfone} ${ouvindo ? styles.ouvindo : ""}`}
              onClick={aoClicarMicrofone}
              disabled={ouvindo}
              aria-label="Falar a pergunta"
              title="Falar a pergunta"
            >
              🎤
            </button>
          )}
        </div>
        {ouvindo && <p className={styles.status}>Ouvindo… pode falar.</p>}
        <button className={styles.enviar} type="submit" disabled={enviando || !pergunta.trim()}>
          {enviando ? "Perguntando…" : "Perguntar"}
        </button>
      </form>

      {erro && <p className={styles.erro}>{erro}</p>}

      <p className={styles.aviso}>
        As respostas são geradas por inteligência artificial com base no ensino da Igreja. Para
        decisões importantes de consciência, sempre confirme com um padre ou diretor espiritual.
        {!temMicrofone && " (O microfone não funciona neste navegador — funciona no Chrome/Android.)"}
      </p>

      <div className={styles.historico}>
        {historico.map((item) => (
          <div key={item.id} className={styles.item}>
            <p className={styles.itemPergunta}>{item.pergunta}</p>
            <p className={styles.itemResposta}>{item.resposta}</p>
            {temLeitura && (
              <button className={styles.ouvir} onClick={() => falarEmVoz(item.resposta)}>
                🔊 Ouvir resposta
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
