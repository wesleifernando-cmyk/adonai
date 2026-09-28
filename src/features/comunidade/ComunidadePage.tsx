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
        title="Pregações e vida da missão"
        lead="Pregações dos encontros e do retiro Desperta. Fotos e álbuns entram na Fase 2."
      />

      <a
        href="https://instagram.com/go.adonai"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instaCard}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        <div>
          <p className={styles.instaLabel}>@go.adonai</p>
          <p className={styles.instaSub}>Toque para ver os stories e acompanhar ao vivo</p>
        </div>
        <span aria-hidden="true">↗</span>
      </a>

      <Link to="/comunidade/pregadores" className={`${list.item} ${list.link}`} style={{ marginBottom: 12, alignItems: "center" }}>
        <div>
          <p className={list.itemEyebrow}>7 pregadores · YouTube</p>
          <h2 className={list.itemTitle}>Pregações de convidados</h2>
        </div>
        <span className={list.chev} aria-hidden="true">→</span>
      </Link>

      <Link to="/comunidade/musicas" className={`${list.item} ${list.link}`} style={{ marginBottom: 16, alignItems: "center" }}>
        <div>
          <p className={list.itemEyebrow}>Spotify</p>
          <h2 className={list.itemTitle}>Louvor católico</h2>
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

      <div className={list.nota} style={{ marginTop: 20 }}>
        <strong>Sobre o arquivo de áudio.</strong> Gravações direto do celular costumam vir muito
        grandes (200–300&nbsp;MB) para caber no site. O jeito certo é comprimir para MP3 em voz
        (64&nbsp;kbps mono fica ótimo para fala — vira ~1&nbsp;MB por cada 2 minutos) e me
        mandar o arquivo comprimido, ou uma pasta do Google Drive/WhatsApp com ele. Também dá
        para hospedar no YouTube (não listado) ou no Spotify for Podcasters, de graça, e eu só
        coloco o player aqui.
      </div>

      <div className={list.nota}>
        <strong>Em construção.</strong> Álbuns de fotos (retiro Desperta, encontros, missões,
        eventos), a página "quem somos" e a área ADM para publicar tudo isso sem mim entram na
        Fase 2, com login da equipe.
      </div>
    </div>
  );
}
