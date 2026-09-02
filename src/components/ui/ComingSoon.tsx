import { Link } from "react-router-dom";
import { PageHeader } from "./PageHeader";
import styles from "./ComingSoon.module.css";

type Props = {
  title: string;
  phase: string;
  children: React.ReactNode;
};

/** Placeholder honesto para seções ainda em construção. */
export function ComingSoon({ title, phase, children }: Props) {
  return (
    <div>
      <PageHeader eyebrow={phase} title={title} />
      <div className={styles.body}>{children}</div>
      <Link to="/" className={styles.back}>← Voltar para Hoje</Link>
    </div>
  );
}
