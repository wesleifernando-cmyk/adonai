import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { historiaSagradoCoracao } from "../../content/sagrado-coracao/historia";
import styles from "./SagradoCoracao.module.css";

export function HistoriaSagradoCoracaoPage() {
  return (
    <div>
      <Link to="/sagrado-coracao" className={styles.voltar}>← Sagrado Coração</Link>

      <PageHeader eyebrow={historiaSagradoCoracao.eyebrow} title={historiaSagradoCoracao.titulo} />

      <div className={styles.historia}>
        {historiaSagradoCoracao.paragrafos.map((p) => (
          <section key={p.titulo}>
            <h2 className={styles.historiaTitulo}>{p.titulo}</h2>
            <p className={`reading ${styles.historiaTexto}`}>{p.texto}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
