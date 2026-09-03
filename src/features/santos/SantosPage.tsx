import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { SantoRetrato } from "../../components/ui/SantoRetrato";
import { santos, santoDoDia } from "../../content/santos";
import styles from "./Santos.module.css";

export function SantosPage() {
  const doDia = santoDoDia();
  const outros = santos.filter((s) => s.slug !== doDia.slug);

  return (
    <div>
      <PageHeader
        eyebrow="Santos"
        title="Testemunhas da fé"
        lead="Um santo por dia para conhecer, mais o acervo completo para estudar quando quiser."
      />

      <Link to={`/santos/${doDia.slug}`} className={styles.featured}>
        <p className="eyebrow">Santo de hoje</p>
        <h2 className={styles.featuredName}>{doDia.nome}</h2>
        <p className={styles.featuredTitle}>{doDia.titulo}</p>
        <p className={styles.featuredResumo}>{doDia.resumo}</p>
        <span className={styles.cta}>Ler a história →</span>
      </Link>

      <h3 className={styles.listHead}>Acervo</h3>
      <ul className={styles.list}>
        {outros.map((s) => (
          <li key={s.slug}>
            <Link to={`/santos/${s.slug}`} className={styles.row}>
              <SantoRetrato nome={s.nome} imagem={s.imagem} size={44} />
              <div className={styles.rowText}>
                <span className={styles.rowName}>{s.nome}</span>
                <span className={styles.rowMeta}>
                  {s.titulo}
                  {s.jovem && <em className={styles.tag}>jovem</em>}
                  {s.doutor && <em className={styles.tag}>doutor(a)</em>}
                </span>
              </div>
              <span className={styles.chev} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
