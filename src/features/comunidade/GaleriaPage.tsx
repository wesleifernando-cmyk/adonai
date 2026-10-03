import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { capaDesperta, fotosDesperta } from "../../content/galerias";
import styles from "./GaleriaPage.module.css";

export function GaleriaPage() {
  const [aberta, setAberta] = useState<number | null>(null);

  const total = fotosDesperta.length;
  const anterior = useCallback(() => setAberta((i) => (i === null ? i : (i - 1 + total) % total)), [total]);
  const proxima = useCallback(() => setAberta((i) => (i === null ? i : (i + 1) % total)), [total]);

  useEffect(() => {
    if (aberta === null) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberta, anterior, proxima]);

  return (
    <div>
      <Link to="/comunidade">← Comunidade</Link>
      <img src={capaDesperta.src} alt="Desperta, 8ª edição" className={styles.capa} />
      <div style={{ marginTop: 16 }}>
        <PageHeader eyebrow="Álbum" title="Retiro Desperta" lead={`${total} fotos. Toque numa foto pra ver em tela cheia.`} />
      </div>

      <div className={styles.grade}>
        {fotosDesperta.map((f, i) => (
          <button key={f.src} className={styles.miniatura} onClick={() => setAberta(i)} aria-label={`Abrir foto ${i + 1}`}>
            <img src={f.thumb} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {aberta !== null && (
        <div className={styles.visor} role="dialog" aria-modal="true" onClick={() => setAberta(null)}>
          <button className={styles.fechar} onClick={() => setAberta(null)} aria-label="Fechar">
            ×
          </button>
          <button
            className={`${styles.seta} ${styles.setaEsq}`}
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <img
            src={fotosDesperta[aberta].src}
            alt={`Foto ${aberta + 1} do Retiro Desperta`}
            className={styles.foto}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.seta} ${styles.setaDir}`}
            onClick={(e) => {
              e.stopPropagation();
              proxima();
            }}
            aria-label="Próxima foto"
          >
            ›
          </button>
          <p className={styles.contador}>
            {aberta + 1} / {total}
          </p>
        </div>
      )}
    </div>
  );
}
