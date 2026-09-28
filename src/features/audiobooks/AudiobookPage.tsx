import { Link, useParams } from "react-router-dom";
import { acharAudiobook } from "../../content/audiobooks";
import styles from "../comunidade/Comunidade.module.css";

export function AudiobookPage() {
  const { slug = "" } = useParams();
  const livro = acharAudiobook(slug);

  if (!livro) {
    return (
      <div>
        <Link to="/audiobooks" className={styles.voltar}>← Audiobooks</Link>
        <p>Audiobook não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/audiobooks" className={styles.voltar}>← Audiobooks</Link>

      <p className="eyebrow">{livro.autor}</p>
      <h1 className={styles.pregadorNome}>{livro.titulo}</h1>
      <p className={styles.pregadorDesc}>{livro.descricao}</p>

      {livro.canalUrl && (
        <a href={livro.canalUrl} target="_blank" rel="noopener noreferrer" className={styles.canalLink}>
          Ver o canal completo: {livro.canalNome} ↗
        </a>
      )}

      {livro.faixas && (
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
      )}

      {livro.linkExterno && (
        <div className={styles.indique}>
          <p className={styles.indiqueTitulo}>O áudio mora no site de origem</p>
          <p className={styles.indiqueTexto}>
            Esse audiolivro é hospedado por {livro.canalNome}. Pra respeitar os direitos de quem
            publicou, a gente não copia o áudio — é só abrir lá pra ouvir.
            {livro.requerLogin && " O site pede um cadastro simples e gratuito pra tocar."}
          </p>
          <a
            href={livro.linkExterno}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.canalLink}
            style={{ marginTop: 12 }}
          >
            Ouvir em {livro.canalNome} ↗
          </a>
        </div>
      )}

      <p className={styles.creditoFinal}>
        Áudio de {livro.canalNome}. Todo crédito ao autor original, {livro.autor}.
      </p>
    </div>
  );
}
