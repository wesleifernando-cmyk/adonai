import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { promessas } from "../../content/sagrado-coracao/promessas";
import styles from "./SagradoCoracao.module.css";

export function PromessasPage() {
  const doze = promessas.slice(0, 11);
  const grande = promessas[11];

  return (
    <div>
      <Link to="/sagrado-coracao" className={styles.voltar}>← Sagrado Coração</Link>

      <PageHeader
        eyebrow="Reveladas a Santa Margarida Maria Alacoque"
        title="As 12 promessas do Sagrado Coração"
        lead="O que Jesus prometeu a quem é devoto e propaga essa devoção."
      />

      <ol className={styles.promessasLista}>
        {doze.map((p, i) => (
          <li key={i} className={styles.promessaItem}>
            <span className={styles.promessaNum}>{i + 1}</span>
            <p className={styles.promessaTexto}>{p.texto}</p>
          </li>
        ))}
      </ol>

      <div className={styles.grandeCard}>
        <p className={styles.grandeTitulo}>12ª — A Grande Promessa</p>
        <p className={styles.grandeTexto}>"{grande.texto}"</p>
      </div>
    </div>
  );
}
