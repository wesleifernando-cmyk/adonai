import { Link, useParams } from "react-router-dom";
import { acharPregador } from "../../content/comunidade/pregadores";
import styles from "./Comunidade.module.css";

export function PregadorPage() {
  const { slug = "" } = useParams();
  const pregador = acharPregador(slug);

  if (!pregador) {
    return (
      <div>
        <Link to="/comunidade/pregadores" className={styles.voltar}>← Pregações</Link>
        <p>Pregador não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/comunidade/pregadores" className={styles.voltar}>← Pregações</Link>

      <p className="eyebrow">Pregador convidado · YouTube</p>
      <h1 className={styles.pregadorNome}>{pregador.nome}</h1>
      <p className={styles.pregadorDesc}>{pregador.descricao}</p>

      {pregador.canalUrl && (
        <a href={pregador.canalUrl} target="_blank" rel="noopener noreferrer" className={styles.canalLink}>
          Ver o canal completo: {pregador.canalNome} ↗
        </a>
      )}

      <div className={styles.videoLista}>
        {pregador.videos.map((v) => (
          <article key={v.youtubeId} className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                title={v.titulo}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className={styles.videoTitulo}>{v.titulo}</h2>
            {v.data && <p className={styles.videoData}>{v.data}</p>}
          </article>
        ))}
      </div>

      <p className={styles.creditoFinal}>
        Todos os vídeos pertencem ao canal {pregador.canalNome}. Tem uma pregação que você quer
        ver aqui? Use "Indique uma pregação" na lista de pregadores.
      </p>
    </div>
  );
}
