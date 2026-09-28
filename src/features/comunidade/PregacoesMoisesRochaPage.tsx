import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { pregacoesMoisesRocha, CANAL_MOISES_ROCHA } from "../../content/comunidade/pregacoesMoisesRocha";
import styles from "./Comunidade.module.css";

export function PregacoesMoisesRochaPage() {
  return (
    <div>
      <Link to="/comunidade" className={styles.voltar}>← Comunidade</Link>

      <PageHeader
        eyebrow="Pregações"
        title="Moisés Rocha"
        lead="Pregações de Moisés Rocha, fundador da Comunidade Filhos de João Batista. Vídeos do canal oficial dele no YouTube — todo crédito é do canal."
      />

      <a href={CANAL_MOISES_ROCHA.url} target="_blank" rel="noopener noreferrer" className={styles.canalLink}>
        Ver o canal completo: {CANAL_MOISES_ROCHA.nome} ↗
      </a>

      <div className={styles.videoLista}>
        {pregacoesMoisesRocha.map((p) => (
          <article key={p.youtubeId} className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${p.youtubeId}`}
                title={p.titulo}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className={styles.videoTitulo}>{p.titulo}</h2>
            {p.data && <p className={styles.videoData}>{p.data}</p>}
          </article>
        ))}
      </div>

      <p className={styles.creditoFinal}>
        Todos os vídeos pertencem ao canal {CANAL_MOISES_ROCHA.nome}. Tem uma pregação que você
        quer ver aqui? Manda o título e o link do YouTube pra equipe da Missão Adonai.
      </p>
    </div>
  );
}
