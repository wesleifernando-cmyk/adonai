import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { livros } from "../../content/livros";
import { apiFetch } from "../../lib/api";
import styles from "./LerLivroPage.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Marcacao = { id: number; pagina: number; trecho: string; criado_em: string };

export function LerLivroPage() {
  const { slug = "" } = useParams();
  const livro = livros.find((l) => l.slug === slug && l.local);

  const [numPaginas, setNumPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [salvandoTrecho, setSalvandoTrecho] = useState(false);
  const [carregado, setCarregado] = useState(false);
  const paginaRef = useRef(pagina);
  paginaRef.current = pagina;

  useEffect(() => {
    if (!slug) return;
    apiFetch<{ paginaAtual: number; marcacoes: Marcacao[] }>(`/leitura/${slug}`)
      .then((dados) => {
        setPagina(dados.paginaAtual);
        setMarcacoes(dados.marcacoes);
      })
      .finally(() => setCarregado(true));
  }, [slug]);

  useEffect(() => {
    if (!carregado || !slug) return;
    const id = setTimeout(() => {
      apiFetch(`/leitura/${slug}/pagina`, { method: "POST", body: JSON.stringify({ pagina }) }).catch(() => {});
    }, 600);
    return () => clearTimeout(id);
  }, [pagina, slug, carregado]);

  if (!livro) {
    return (
      <div>
        <Link to="/livros">← Biblioteca</Link>
        <p>Livro não encontrado.</p>
      </div>
    );
  }

  function irPara(p: number) {
    setPagina(Math.min(Math.max(p, 1), numPaginas || p));
  }

  async function salvarSelecao() {
    const texto = window.getSelection()?.toString().trim();
    if (!texto) {
      alert("Selecione um trecho do texto na página antes de salvar.");
      return;
    }
    setSalvandoTrecho(true);
    try {
      const dados = await apiFetch<{ marcacao: Marcacao }>(`/leitura/${slug}/marcacao`, {
        method: "POST",
        body: JSON.stringify({ pagina: paginaRef.current, trecho: texto }),
      });
      setMarcacoes((atual) => [...atual, dados.marcacao].sort((a, b) => a.pagina - b.pagina));
      window.getSelection()?.removeAllRanges();
    } catch {
      alert("Não deu pra salvar esse trecho agora.");
    } finally {
      setSalvandoTrecho(false);
    }
  }

  async function removerMarcacao(id: number) {
    setMarcacoes((atual) => atual.filter((m) => m.id !== id));
    try {
      await apiFetch(`/leitura/${slug}/marcacao/${id}`, { method: "DELETE" });
    } catch {
      // silencioso — a marcação já sumiu da tela
    }
  }

  return (
    <div>
      <Link to="/livros">← Biblioteca</Link>

      <div className={styles.topo} style={{ marginTop: 12 }}>
        <div className={styles.info}>
          <h1 className={styles.titulo}>{livro.titulo}</h1>
          <p className={styles.autor}>{livro.autor}</p>
        </div>
        <a className={styles.baixar} href={livro.url} download>
          ⬇ Baixar PDF
        </a>
      </div>

      <div className={styles.leitor}>
        <Document
          file={livro.url}
          onLoadSuccess={(pdf) => setNumPaginas(pdf.numPages)}
          loading={<p className={styles.aviso}>Carregando o livro…</p>}
          error={<p className={styles.aviso}>Não deu pra carregar o PDF aqui.</p>}
        >
          <Page pageNumber={pagina} width={340} />
        </Document>
      </div>

      <div className={styles.controles}>
        <button className={styles.botaoPagina} onClick={() => irPara(pagina - 1)} disabled={pagina <= 1}>
          ← Anterior
        </button>
        <span className={styles.paginaAtual}>
          Página {pagina}
          {numPaginas ? ` de ${numPaginas}` : ""}
        </span>
        <button className={styles.botaoPagina} onClick={() => irPara(pagina + 1)} disabled={pagina >= numPaginas}>
          Próxima →
        </button>
      </div>

      <button className={styles.salvarTrecho} onClick={salvarSelecao} disabled={salvandoTrecho}>
        {salvandoTrecho ? "Salvando…" : "✎ Selecionar texto acima e grifar"}
      </button>

      {marcacoes.length > 0 && (
        <div className={styles.marcacoes}>
          <h2 className={styles.marcacoesTitulo}>Seus grifos neste livro</h2>
          {marcacoes.map((m) => (
            <div key={m.id} className={styles.marcacao}>
              <button className={styles.marcacaoPagina} onClick={() => irPara(m.pagina)}>
                p. {m.pagina}
              </button>
              <p className={styles.marcacaoTrecho}>{m.trecho}</p>
              <button className={styles.marcacaoRemover} onClick={() => removerMarcacao(m.id)} aria-label="Remover">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <p className={styles.aviso}>Fonte: {livro.fonte}</p>
    </div>
  );
}
