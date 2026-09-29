import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import styles from "./CatolicoRespondePage.module.css";

type ItemHistorico = { id: number; pergunta: string; resposta: string; criado_em: string };

export function CatolicoRespondePage() {
  const [pergunta, setPergunta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);

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
      await apiFetch<{ resposta: string }>("/catolico-responde/perguntar", {
        method: "POST",
        body: JSON.stringify({ pergunta }),
      });
      setPergunta("");
      await carregarHistorico();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao consultar a IA.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Católico Responde"
        title="Tire sua dúvida da fé"
        lead="Pergunte sobre Bíblia, Catecismo, santos ou qualquer dúvida da fé católica."
      />

      <form className={styles.campo} onSubmit={enviar}>
        <textarea
          className={styles.textarea}
          placeholder="Ex: Por que os católicos rezam pelos mortos?"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
        />
        <button className={styles.enviar} type="submit" disabled={enviando || !pergunta.trim()}>
          {enviando ? "Perguntando…" : "Perguntar"}
        </button>
      </form>

      {erro && <p className={styles.erro}>{erro}</p>}

      <p className={styles.aviso}>
        As respostas são geradas por inteligência artificial com base no ensino da Igreja. Para
        decisões importantes de consciência, sempre confirme com um padre ou diretor espiritual.
      </p>

      <div className={styles.historico}>
        {historico.map((item) => (
          <div key={item.id} className={styles.item}>
            <p className={styles.itemPergunta}>{item.pergunta}</p>
            <p className={styles.itemResposta}>{item.resposta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
