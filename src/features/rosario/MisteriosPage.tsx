import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { conjuntos, conjuntoDoDia } from "../../content/rosario/misterios";
import styles from "./Rosario.module.css";

export function MisteriosPage() {
  const hoje = conjuntoDoDia();

  return (
    <div>
      <PageHeader
        eyebrow="Estudo e meditação"
        title="Os 20 mistérios"
        lead="Cada mistério com a referência bíblica e um ponto para meditar."
      />

      <div className={styles.conjuntosGrid}>
        {conjuntos.map((c) => (
          <Link
            key={c.slug}
            to={`/rosario/misterios/${c.slug}`}
            className={styles.conjuntoCard}
            style={{ borderColor: `${c.cor}55` }}
          >
            {c.slug === hoje.slug && <span className={styles.hojeTag}>Hoje</span>}
            <span className={styles.conjuntoNome} style={{ color: c.cor }}>{c.nome}</span>
            <span className={styles.conjuntoDias}>{c.dias}</span>
            <span className={styles.conjuntoResumo}>{c.resumo}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
