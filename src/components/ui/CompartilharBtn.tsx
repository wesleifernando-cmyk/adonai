import { useState } from "react";
import styles from "./CompartilharBtn.module.css";

type Props = {
  titulo: string;
  texto: string;
  /** caminho relativo, ex.: "/santos/carlo-acutis" */
  path: string;
};

/** Botão de compartilhar. Usa o menu nativo do celular quando existe;
 *  senão, copia o texto + link para a área de transferência.
 *  O link do site vai junto para quem receber saber a fonte. */
export function CompartilharBtn({ titulo, texto, path }: Props) {
  const [estado, setEstado] = useState<"idle" | "copiado">("idle");
  const url = typeof window !== "undefined" ? window.location.origin + path : path;
  const mensagem = `${titulo}\n\n${texto}\n\nvia Adonai — ${url}`;

  async function compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: `${titulo}\n\n${texto}\n\nvia Adonai`, url });
        return;
      } catch {
        /* usuário cancelou — cai para a cópia */
      }
    }
    try {
      await navigator.clipboard.writeText(mensagem);
      setEstado("copiado");
      setTimeout(() => setEstado("idle"), 2200);
    } catch {
      /* sem clipboard — nada a fazer */
    }
  }

  return (
    <button type="button" className={styles.btn} onClick={compartilhar}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {estado === "copiado" ? "Copiado!" : "Compartilhar"}
    </button>
  );
}
