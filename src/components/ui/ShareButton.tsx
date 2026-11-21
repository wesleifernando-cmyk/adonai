import { useState } from "react";
import styles from "./ShareButton.module.css";

type Props = {
  /** endereço a compartilhar (padrão: o site do Adonai) */
  url?: string;
  titulo: string;
  texto: string;
  children: React.ReactNode;
  variante?: "fogo" | "suave";
};

/**
 * Abre a folha de compartilhamento do celular (WhatsApp, Instagram, etc.).
 * Se o aparelho não tiver, copia o link e avisa.
 */
export function ShareButton({ url, titulo, texto, children, variante = "suave" }: Props) {
  const [aviso, setAviso] = useState<string | null>(null);
  const link = url ?? window.location.origin;

  function avisar(m: string) {
    setAviso(m);
    window.setTimeout(() => setAviso(null), 3000);
  }

  async function compartilhar() {
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, text: texto, url: link });
        return;
      }
    } catch (err) {
      // Pessoa fechou a folha de compartilhar: não é erro.
      if (err instanceof DOMException && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(`${texto} ${link}`);
      avisar("Link copiado! É só colar na conversa.");
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${texto} ${link}`)}`, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div>
      <button type="button" onClick={compartilhar} className={`${styles.botao} ${variante === "fogo" ? styles.fogo : ""}`}>
        <span aria-hidden="true">↗</span> {children}
      </button>
      {aviso && <p className={styles.aviso} role="status">{aviso}</p>}
    </div>
  );
}
