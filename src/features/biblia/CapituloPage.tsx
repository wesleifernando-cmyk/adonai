import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { acharLivro, livroVizinho } from "../../content/biblia";
import { carregarLivro, TRADUCAO_ATUAL, type LivroTexto } from "../../lib/biblia";
import { CompartilharBtn } from "../../components/ui/CompartilharBtn";
import styles from "./Biblia.module.css";

export function CapituloPage() {
  const { livro = "", capitulo = "1" } = useParams();
  const navigate = useNavigate();
  const cap = Math.max(1, parseInt(capitulo, 10) || 1);
  const meta = acharLivro(livro);

  const [texto, setTexto] = useState<LivroTexto | null>(null);
  const [estado, setEstado] = useState<"carregando" | "ok" | "erro">("carregando");

  useEffect(() => {
    let vivo = true;
    setEstado("carregando");
    carregarLivro(livro).then((d) => {
      if (!vivo) return;
      setTexto(d);
      setEstado(d ? "ok" : "erro");
      window.scrollTo(0, 0);
    });
    return () => {
      vivo = false;
    };
  }, [livro]);

  if (!meta) {
    return (
      <div className={styles.vazio}>
        <h1>Livro não encontrado</h1>
        <Link to="/biblia" className={styles.voltar}>← Bíblia</Link>
      </div>
    );
  }

  const totalCap = texto?.capitulos.length ?? meta.capitulos;
  const versiculos = texto?.capitulos[cap - 1] ?? [];

  function irCapitulo(n: number) {
    if (n >= 1 && n <= totalCap) navigate(`/biblia/${livro}/${n}`);
    else if (n < 1) {
      const ant = livroVizinho(livro, -1);
      if (ant) navigate(`/biblia/${ant.slug}/${ant.capitulos}`);
    } else {
      const prox = livroVizinho(livro, 1);
      if (prox) navigate(`/biblia/${prox.slug}/1`);
    }
  }

  return (
    <div className={styles.leitura}>
      <div className={styles.leituraTopo}>
        <Link to={`/biblia/${livro}`} className={styles.voltar}>← {meta.nome}</Link>
        <span className={styles.traducao}>{TRADUCAO_ATUAL.sigla}</span>
      </div>

      <h1 className={styles.capTitulo}>
        {meta.nome} <span>{cap}</span>
      </h1>

      {estado === "carregando" && <p className={styles.status}>Carregando…</p>}
      {estado === "erro" && (
        <p className={styles.status}>
          Este livro ainda não tem texto disponível. Volte em breve.
        </p>
      )}

      {estado === "ok" && (
        <>
          <div className={`reading ${styles.versos}`}>
            {versiculos.map((v, i) => (
              <p key={i}>
                <sup className={styles.vnum}>{i + 1}</sup>
                {v}
              </p>
            ))}
          </div>

          <div className={styles.navCap}>
            <button type="button" onClick={() => irCapitulo(cap - 1)} className={styles.navBtn}>
              ← Anterior
            </button>
            <span className={styles.navPos}>
              {cap} / {totalCap}
            </span>
            <button type="button" onClick={() => irCapitulo(cap + 1)} className={styles.navBtn}>
              Próximo →
            </button>
          </div>

          <div className={styles.acoes}>
            <CompartilharBtn
              titulo={`${meta.nome} ${cap}`}
              texto={
                versiculos[0]
                  ? `"${versiculos[0]}" (${meta.nome} ${cap}.1)`
                  : `${meta.nome}, capítulo ${cap}`
              }
              path={`/biblia/${livro}/${cap}`}
            />
          </div>

          <p className={styles.fonte}>
            {TRADUCAO_ATUAL.nome} · {TRADUCAO_ATUAL.nota}
          </p>
        </>
      )}
    </div>
  );
}
