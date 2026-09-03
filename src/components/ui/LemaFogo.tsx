import { LEMA_FOGO } from "../../content/lemas";
import styles from "./LemaFogo.module.css";

/** Faixa com a palavra profética do grupo. */
export function LemaFogo() {
  return (
    <aside className={styles.strip} aria-label="Lema do grupo Adonai">
      <span className={styles.flame} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2s6 5.5 6 11a6 6 0 0 1-12 0c0-2 1-3.5 1-3.5S6 12 6 14a4 4 0 0 0 .3 1.5C5.5 14.6 5 13 5 11 5 6 12 2 12 2Zm0 18a3 3 0 0 0 3-3c0-2-2-3.5-2-3.5s.2 1.2-.6 1.9c0-1.4-1.4-2.6-1.4-2.6s-2 1.7-2 4.2A3 3 0 0 0 12 20Z" />
        </svg>
      </span>
      <p className={styles.text}>{LEMA_FOGO}</p>
    </aside>
  );
}
