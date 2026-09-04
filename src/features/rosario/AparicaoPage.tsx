import { Link, useParams } from "react-router-dom";
import { acharAparicao } from "../../content/rosario/aparicoes";
import { SantoRetrato } from "../../components/ui/SantoRetrato";
import { CompartilharBtn } from "../../components/ui/CompartilharBtn";
import santosStyles from "../santos/Santos.module.css";
import styles from "./Rosario.module.css";

export function AparicaoPage() {
  const { slug = "" } = useParams();
  const a = acharAparicao(slug);

  if (!a) {
    return (
      <div>
        <p>Não encontrado.</p>
        <Link to="/rosario/aparicoes" className={styles.voltar}>← Aparições</Link>
      </div>
    );
  }

  return (
    <article className={santosStyles.detail}>
      <Link to="/rosario/aparicoes" className={santosStyles.back}>← Aparições</Link>

      {a.imagem ? (
        <div className={santosStyles.retrato}>
          <SantoRetrato nome={a.titulo} imagem={a.imagem} destaque />
          {a.imagemCredito && <p className={santosStyles.credito}>{a.imagemCredito}</p>}
        </div>
      ) : (
        <div className={santosStyles.retratoMini}>
          <SantoRetrato nome={a.titulo} size={72} />
        </div>
      )}

      <p className="eyebrow">{a.local} · {a.ano}</p>
      <h1 className={santosStyles.name}>{a.titulo}</h1>

      <div className={`reading ${santosStyles.body}`}>
        {a.historia.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className={santosStyles.acoes}>
        <CompartilharBtn titulo={a.titulo} texto={a.resumo} path={`/rosario/aparicoes/${a.slug}`} />
      </div>
    </article>
  );
}
