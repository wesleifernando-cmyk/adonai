import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { ChurchMark } from "../../components/ui/ChurchMark";
import { pregacoes } from "../../content/comunidade/pregacoes";
import list from "../_shared/List.module.css";
import styles from "./Comunidade.module.css";

export function ComunidadePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Missão Adonai"
        title="Pregações"
        lead="As pregações dos encontros e dos pregadores convidados."
      />

      <Link to="/comunidade/pregadores" className={`${list.item} ${list.link}`} style={{ marginBottom: 16, alignItems: "center" }}>
        <div>
          <p className={list.itemEyebrow}>7 pregadores · YouTube</p>
          <h2 className={list.itemTitle}>Pregações de convidados</h2>
        </div>
        <span className={list.chev} aria-hidden="true">→</span>
      </Link>

      <div className={list.stack}>
        {pregacoes.map((p) => (
          <article key={p.slug} className={styles.card}>
            <div className={styles.capa} aria-hidden="true">
              <ChurchMark size={26} />
            </div>
            <div className={styles.corpo}>
              <p className={list.itemEyebrow}>{p.evento}{p.data ? ` · ${p.data}` : ""}</p>
              <h2 className={list.itemTitle}>{p.titulo}</h2>
              {p.descricao && <p className={styles.desc}>{p.descricao}</p>}

              {p.audio ? (
                <audio controls preload="none" className={styles.audio} src={p.audio} />
              ) : (
                <p className={styles.semAudio}>Áudio ainda não publicado.</p>
              )}
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
