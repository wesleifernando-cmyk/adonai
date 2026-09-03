import { ChurchMark } from "./ChurchMark";
import styles from "./SantoRetrato.module.css";

type Props = {
  nome: string;
  imagem?: string;
  size?: number;
  /** true = quadrado grande da página do santo; false = miniatura redonda */
  destaque?: boolean;
};

function iniciais(nome: string): string {
  const limpo = nome
    .replace(/^(São|Santa|Santo|Bem-aventurado|Beato|Beata)\s+/i, "")
    .trim();
  const partes = limpo.split(/\s+/).filter(Boolean);
  return (partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "");
}

/** Retrato do santo — imagem quando existe, senão um monograma. */
export function SantoRetrato({ nome, imagem, size = 56, destaque = false }: Props) {
  const cls = destaque ? `${styles.wrap} ${styles.destaque}` : styles.wrap;
  const dim = destaque ? undefined : { width: size, height: size };

  if (imagem) {
    return (
      <div className={cls} style={dim}>
        <img src={imagem} alt={nome} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`${cls} ${styles.fallback}`} style={dim} aria-hidden="true">
      <span className={styles.mono}>{iniciais(nome).toUpperCase()}</span>
      {destaque && (
        <span className={styles.church}>
          <ChurchMark size={18} />
        </span>
      )}
    </div>
  );
}
