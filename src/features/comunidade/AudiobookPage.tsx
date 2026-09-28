import { Link, useParams } from "react-router-dom";
import { acharAudiobook } from "../../content/comunidade/audiobooks";
import styles from "./Comunidade.module.css";

export function AudiobookPage() {
  const { slug = "" } = useParams();
  const livro = acharAudiobook(slug);

  if (!livro) {
    return (
      <div>
        <Link to="/comunidade/audiobooks" className={styles.voltar}>← Audiobooks</Link>
        <p>Audiobook não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/comunidade/audiobooks" className={styles.voltar}>← Audiobooks</Link>

      <p className="eyebrow">{livro.autor}</p>
      <h1 className={styles.pregadorNome}>{livro.titulo}</h1>
      <p className={styles.pregadorDesc}>{livro.descricao}</p>

      {livro.canalUrl && (
        <a href={livro.canalUrl} target="_blank" rel="noopener noreferrer" className={styles.canalLink}>
          Ver o canal completo: {livro.canalNome} ↗
        </a>
      )}

      <div className={styles.videoLista}>
        {livro.faixas.map((f) => (
          <article key={f.youtubeId} className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${f.youtubeId}`}
                title={f.titulo}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className={styles.videoTitulo}>{f.titulo}</h2>
          </article>
        ))}
      </div>

      <p className={styles.creditoFinal}>
        Áudio de {livro.canalNome}. Todo crédito ao autor original, {livro.autor}.
      </p>
    </div>
  );
}
