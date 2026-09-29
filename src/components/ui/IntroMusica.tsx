import { useState } from "react";
import styles from "./IntroMusica.module.css";

/**
 * "Até o Fim - Ao Vivo" (Cristo Alegria) como porta de entrada do site.
 *
 * Nenhum navegador deixa um site tocar som sozinho, sem nenhum toque —
 * é bloqueado no nível do sistema (Chrome, Safari, todos). O jeito mais
 * próximo de "entrar e a música já começa" é fazer do toque de entrar a
 * própria ação que liga o som: por isso a Home abre com este portão em
 * tela cheia, e o único toque nele (em qualquer lugar do card) já revela
 * o site E dispara a música ao mesmo tempo.
 *
 * Só aparece na DATA_LIMITE; depois disso some sozinho, sem precisar
 * remover nada na mão. Quem já entrou (ou fechou) hoje não vê de novo.
 */
const DATA_LIMITE = "2026-09-28";
const CHAVE_VISTO = "adonai_intro_musica_visto_2026-09-28";
const SPOTIFY_TRACK_ID = "26D5QxEKbXWNkdSYdBTWqb";

function dataLocalHoje() {
  const d = new Date();
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

type Fase = "portao" | "tocando" | "escondido";

export function IntroMusica() {
  const hojeEhDia = dataLocalHoje() === DATA_LIMITE;

  const [fase, setFase] = useState<Fase>(() => {
    if (!hojeEhDia) return "escondido";
    try {
      return localStorage.getItem(CHAVE_VISTO) === "1" ? "escondido" : "portao";
    } catch {
      return "portao";
    }
  });

  if (fase === "escondido") return null;

  function lembrar() {
    try {
      localStorage.setItem(CHAVE_VISTO, "1");
    } catch {
      /* sem localStorage, tudo bem — só não vai lembrar na próxima visita */
    }
  }

  function entrar() {
    lembrar();
    setFase("tocando");
  }

  function fechar() {
    lembrar();
    setFase("escondido");
  }

  if (fase === "portao") {
    return (
      <button className={styles.portao} onClick={entrar} aria-label="Entrar e tocar Até o Fim, do Cristo Alegria">
        <p className={styles.fraseGrande}>
          “Quero ver alguém tentar
          <br />
          me tirar desse lugar.
          <br />
          Nada nos separará.”
        </p>
        <p className={styles.credito}>Até o Fim · Cristo Alegria</p>
        <span className={styles.entrarCta}>▶ Entrar</span>
      </button>
    );
  }

  return (
    <div className={styles.banner}>
      <button className={styles.fechar} onClick={fechar} aria-label="Fechar">
        ×
      </button>
      <p className={styles.credito}>Até o Fim · Cristo Alegria</p>
      <iframe
        className={styles.player}
        src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?autoplay=1&theme=0`}
        width="100%"
        height="152"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        title="Até o Fim - Ao Vivo (Cristo Alegria)"
      />
    </div>
  );
}
