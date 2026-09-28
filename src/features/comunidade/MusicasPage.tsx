import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { gruposMusicais } from "../../content/comunidade/musicas";
import list from "../_shared/List.module.css";
import styles from "./Comunidade.module.css";

export function MusicasPage() {
  return (
    <div>
      <Link to="/comunidade" className={styles.voltar}>← Comunidade</Link>

      <PageHeader
        eyebrow="Músicas"
        title="Louvor católico"
        lead="O louvor da Missão Adonai e de outras comunidades, direto do Spotify."
      />

      <div className={list.stack}>
        {gruposMusicais.map((g) => (
          <Link
            key={g.slug}
            to={`/comunidade/musicas/${g.slug}`}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>{g.tipo === "playlist" ? "Playlist" : "Artista"} · Spotify</p>
              <h2 className={list.itemTitle}>{g.nome}</h2>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
