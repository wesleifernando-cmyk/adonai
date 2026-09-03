import styles from "./LemaFogo.module.css";

/**
 * A palavra profética da Missão, em pirâmide:
 *   Vai sair um FOGO
 *   deste lugar que vai
 *   QUEIMAR o mundo todo
 * (FOGO e QUEIMAR em vermelho.)
 */
export function LemaFogo() {
  return (
    <p className={styles.fogo} aria-label="Vai sair um fogo deste lugar que vai queimar o mundo todo">
      <span className={styles.l1}>
        Vai sair um <em>fogo</em>
      </span>
      <span className={styles.l2}>deste lugar que vai</span>
      <span className={styles.l3}>
        <em>queimar</em> o mundo todo
      </span>
    </p>
  );
}
