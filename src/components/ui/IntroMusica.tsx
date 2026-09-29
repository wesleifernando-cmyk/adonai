import { useState } from "react";
import styles from "./IntroMusica.module.css";

/**
 * Banner de abertura com "Até o Fim - Ao Vivo" (Cristo Alegria).
 * Só aparece na DATA_LIMITE; depois disso some sozinho e não precisa remover na mão.
 * Também some se a pessoa fechar (X), guardado no localStorage do navegador dela.
 */
const DATA_LIMITE = "2026-09-28";
const CHAVE_FECHOU = "adonai_intro_musica_fechou_2026-09-28";

function dataLocalHoje() {
  const d = new Date();
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function IntroMusica() {
  const hoje = dataLocalHoje();
  const [fechou, setFechou] = useState(() => {
    try {
      return localStorage.getItem(CHAVE_FECHOU) === "1";
    } catch {
      return false;
    }
  });

  if (hoje !== DATA_LIMITE || fechou) return null;

  function fechar() {
    try {
      localStorage.setItem(CHAVE_FECHOU, "1");
    } catch {
      /* localStorage indisponível, tudo bem — só não vai lembrar na próxima visita */
    }
    setFechou(true);
  }

  return (
    <div className={styles.banner}>
      <button className={styles.fechar} onClick={fechar} aria-label="Fechar">
        ×
      </button>
      <p className={styles.frase}>
        “Quero ver alguém tentar me tirar desse lugar.
        <br />
        Nada nos separará.”
      </p>
      <p className={styles.credito}>Até o Fim · Cristo Alegria</p>
      <iframe
        className={styles.player}
        src="https://open.spotify.com/embed/track/26D5QxEKbXWNkdSYdBTWqb?theme=0"
        width="100%"
        height="152"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Até o Fim - Ao Vivo (Cristo Alegria)"
      />
    </div>
  );
}
