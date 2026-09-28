import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { pregadores } from "../../content/comunidade/pregadores";
import { IndiquePregacao } from "./IndiquePregacao";
import list from "../_shared/List.module.css";
import styles from "./Comunidade.module.css";

export function PregadoresPage() {
  return (
    <div>
      <Link to="/comunidade" className={styles.voltar}>← Comunidade</Link>

      <PageHeader
        eyebrow="Pregadores convidados"
        title="Pregações"
        lead="Vídeos incorporados direto do YouTube — todo crédito, visualização e receita de publicidade são dos canais originais."
      />

      <div className={list.stack}>
        {pregadores.map((p) => (
          <Link
            key={p.slug}
            to={`/comunidade/pregadores/${p.slug}`}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>{p.videos.length} pregações</p>
              <h2 className={list.itemTitle}>{p.nome}</h2>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      <IndiquePregacao />
    </div>
  );
}
