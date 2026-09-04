import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { SantoRetrato } from "../../components/ui/SantoRetrato";
import { conjuntoDoDia } from "../../content/rosario/misterios";
import { aparicoes } from "../../content/rosario/aparicoes";
import { todayLong } from "../../lib/dates";
import styles from "./Rosario.module.css";

export function RosarioPage() {
  const hoje = conjuntoDoDia();
  const aparecida = aparicoes.find((a) => a.slug === "aparecida")!;

  return (
    <div>
      <PageHeader eyebrow="Oração" title="Rosário" lead="Rezar, aprender, meditar e conhecer Nossa Senhora." />

      <Link to="/rosario/rezar" className={styles.destaqueCard}>
        <p className="eyebrow">Hoje, {todayLong()}</p>
        <h2 className={styles.destaqueTitulo}>{hoje.nome}</h2>
        <p className={styles.destaqueTexto}>{hoje.resumo}</p>
        <span className={styles.cta}>Começar a rezar →</span>
      </Link>

      <div className={styles.grid}>
        <Link to="/rosario/aprenda" className={styles.tile}>
          <span className={styles.tileTitulo}>Aprenda a rezar</span>
          <span className={styles.tileDesc}>Passo a passo para quem está começando</span>
        </Link>
        <Link to="/rosario/misterios" className={styles.tile}>
          <span className={styles.tileTitulo}>Estudo dos mistérios</span>
          <span className={styles.tileDesc}>Cada mistério e onde está na Bíblia</span>
        </Link>
        <Link to="/rosario/historia" className={styles.tile}>
          <span className={styles.tileTitulo}>História do Rosário</span>
          <span className={styles.tileDesc}>De São Domingos a São João Paulo II</span>
        </Link>
        <Link to="/rosario/aparicoes" className={styles.tile}>
          <span className={styles.tileTitulo}>Aparições de Nossa Senhora</span>
          <span className={styles.tileDesc}>Aparecida, Fátima, Guadalupe e outras</span>
        </Link>
      </div>

      <Link to={`/rosario/aparicoes/${aparecida.slug}`} className={styles.aparecidaCard}>
        <SantoRetrato nome={aparecida.titulo} imagem={aparecida.imagem} size={64} />
        <div>
          <p className="eyebrow">Padroeira do Brasil</p>
          <h3 className={styles.aparecidaTitulo}>{aparecida.titulo}</h3>
          <p className={styles.aparecidaTexto}>{aparecida.resumo}</p>
        </div>
      </Link>
    </div>
  );
}
