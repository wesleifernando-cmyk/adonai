import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import styles from "./Comunidade.module.css";

const SPOTIFY_ARTIST_ID = "7HyPrXw9pPiT9KFtG8frwn";

export function MusicasPage() {
  return (
    <div>
      <Link to="/comunidade" className={styles.voltar}>← Comunidade</Link>

      <PageHeader
        eyebrow="Músicas"
        title="Músicas Adonai"
        lead="O louvor da Missão Adonai, gravado e publicado no Spotify."
      />

      <div className={styles.spotifyWrap}>
        <iframe
          title="Adonai no Spotify"
          src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          style={{ borderRadius: 12, border: 0 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <a
        href={`https://open.spotify.com/intl-pt/artist/${SPOTIFY_ARTIST_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.canalLink}
      >
        Abrir no app do Spotify ↗
      </a>
    </div>
  );
}
