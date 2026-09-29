import { useState } from "react";
import styles from "./IntroMusica.module.css";

/**
 * Portão de entrada da Home com música de abertura.
 *
 * Nenhum navegador deixa um site tocar som sozinho, sem nenhum toque —
 * é bloqueado no nível do sistema (Chrome, Safari, todos). O jeito mais
 * próximo de "entrar e a música já começa" é fazer do toque de entrar a
 * própria ação que liga o som: por isso a Home abre com este portão em
 * tela cheia, e o toque em "Entrar" já revela o site E dispara a música
 * ao mesmo tempo. Um segundo botão deixa trocar qual música toca antes
 * de entrar.
 *
 * Só aparece na DATA_LIMITE; depois disso some sozinho, sem precisar
 * remover nada na mão. Quem já entrou (ou fechou) hoje não vê de novo.
 */
const DATA_LIMITE = "2026-09-28";
const CHAVE_VISTO = "adonai_intro_musica_visto_2026-09-28";

type Opcao = {
  spotifyId: string;
  titulo: string;
  artista: string;
  frase?: string[];
};

const OPCOES: Opcao[] = [
  {
    spotifyId: "5dfd0pFIdFZdsel5bR8kpg",
    titulo: "Farol",
    artista: "Herrison Pontes, Colo de Deus e Clayra Coutinho",
  },
  {
    spotifyId: "65ZIZYNgPIfyilwjc6Wl0q",
    titulo: "Príncipe da Paz",
    artista: "Flavio Vitor Jr. e Fraternidade São João Paulo II",
  },
  {
    spotifyId: "4ZgTPzhYjp2Yn1MNrvzfwf",
    titulo: "Queima de Novo",
    artista: "Flavio Vitor Jr. e Tony Allysson",
  },
];

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
  const [indice, setIndice] = useState(0);

  if (fase === "escondido") return null;

  const opcao = OPCOES[indice];

  function lembrar() {
    try {
      localStorage.setItem(CHAVE_VISTO, "1");
    } catch {
      /* sem localStorage, tudo bem — só não vai lembrar na próxima visita */
    }
  }

  function trocarMusica() {
    setIndice((i) => (i + 1) % OPCOES.length);
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
      <div className={styles.portao}>
        {opcao.frase ? (
          <p className={styles.fraseGrande}>
            {opcao.frase.map((linha, i) => (
              <span key={i}>
                {linha}
                {i < opcao.frase!.length - 1 && <br />}
              </span>
            ))}
          </p>
        ) : (
          <p className={styles.fraseGrande}>{opcao.titulo}</p>
        )}
        <p className={styles.credito}>
          {opcao.titulo} · {opcao.artista}
        </p>
        <button className={styles.entrarCta} onClick={entrar}>
          ▶ Entrar
        </button>
        <button className={styles.trocarCta} onClick={trocarMusica}>
          🔀 Trocar música
        </button>
      </div>
    );
  }

  return (
    <div className={styles.banner}>
      <button className={styles.fechar} onClick={fechar} aria-label="Fechar">
        ×
      </button>
      <p className={styles.credito}>
        {opcao.titulo} · {opcao.artista}
      </p>
      <iframe
        className={styles.player}
        src={`https://open.spotify.com/embed/track/${opcao.spotifyId}?autoplay=1&theme=0`}
        width="100%"
        height="152"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        title={`${opcao.titulo} (${opcao.artista})`}
      />
    </div>
  );
}
