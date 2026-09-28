import { Link, useParams } from "react-router-dom";
import { acharGrupoMusical } from "../../content/comunidade/musicas";
import styles from "./Comunidade.module.css";

export function MusicaPage() {
  const { slug = "" } = useParams();
  const grupo = acharGrupoMusical(slug);

  if (!grupo) {
    return (
      <div>
        <Link to="/comunidade/musicas" className={styles.voltar}>← Músicas</Link>
        <p>Não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/comunidade/musicas" className={styles.voltar}>← Músicas</Link>

      <p className="eyebrow">{grupo.tipo === "playlist" ? "Playlist" : "Artista"} · Spotify</p>
      <h1 className={styles.pregadorNome}>{grupo.nome}</h1>
      <p className={styles.pregadorDesc}>{grupo.descricao}</p>

      <div className={styles.spotifyWrap}>
        <iframe
          title={grupo.nome}
          src={`https://open.spotify.com/embed/${grupo.tipo}/${grupo.spotifyId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          style={{ borderRadius: 12, border: 0 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <a
        href={`https://open.spotify.com/${grupo.tipo}/${grupo.spotifyId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.canalLink}
      >
        Abrir no app do Spotify ↗
      </a>

      {grupo.curadoriaPor && (
        <p className={styles.creditoFinal}>Playlist com curadoria de {grupo.curadoriaPor}.</p>
      )}
    </div>
  );
}
