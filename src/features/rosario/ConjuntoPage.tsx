import { Link, useParams } from "react-router-dom";
import { acharConjunto } from "../../content/rosario/misterios";
import styles from "./Rosario.module.css";

export function ConjuntoPage() {
  const { slug = "" } = useParams();
  const conjunto = acharConjunto(slug);

  if (!conjunto) {
    return (
      <div>
        <p>Conjunto não encontrado.</p>
        <Link to="/rosario/misterios" className={styles.voltar}>← Mistérios</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/rosario/misterios" className={styles.voltar}>← Mistérios</Link>
      <p className="eyebrow" style={{ color: conjunto.cor }}>{conjunto.dias}</p>
      <h1 className={styles.livroTitulo}>{conjunto.nome}</h1>
      <p className={styles.livroSub}>{conjunto.resumo}</p>

      <ol className={styles.misteriosLista}>
        {conjunto.misterios.map((m, i) => (
          <li key={m.titulo} className={styles.misterioItem}>
            <span className={styles.misterioNum} style={{ background: conjunto.cor }}>{i + 1}</span>
            <div>
              <h2 className={styles.misterioItemTitulo}>{m.titulo}</h2>
              <p className={styles.misterioItemRef}>{m.referencia}</p>
              <p className={`reading ${styles.misterioItemTexto}`}>{m.meditacao}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
