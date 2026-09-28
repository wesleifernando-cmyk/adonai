import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { grandePromessa } from "../../content/sagrado-coracao/promessas";
import styles from "./SagradoCoracao.module.css";

export function SagradoCoracaoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Devoção"
        title="Sagrado Coração de Jesus"
        lead="A história, as promessas e como viver a consagração ao Coração de Jesus."
      />

      <Link to="/sagrado-coracao/promessas" className={styles.destaqueCard}>
        <p className="eyebrow">A Grande Promessa</p>
        <h2 className={styles.destaqueTitulo}>A graça da penitência final</h2>
        <p className={styles.destaqueTexto}>"{grandePromessa.texto}"</p>
        <span className={styles.cta}>Ver as 12 promessas →</span>
      </Link>

      <div className={styles.grid}>
        <Link to="/sagrado-coracao/historia" className={styles.tile}>
          <span className={styles.tileTitulo}>História e aparições</span>
          <span className={styles.tileDesc}>Santa Margarida Maria Alacoque, em Paray-le-Monial</span>
        </Link>
        <Link to="/sagrado-coracao/promessas" className={styles.tile}>
          <span className={styles.tileTitulo}>As 12 promessas</span>
          <span className={styles.tileDesc}>O que Jesus prometeu aos devotos</span>
        </Link>
        <Link to="/sagrado-coracao/consagracao" className={styles.tile}>
          <span className={styles.tileTitulo}>Como se consagrar</span>
          <span className={styles.tileDesc}>Passo a passo + oração de consagração</span>
        </Link>
      </div>
    </div>
  );
}
