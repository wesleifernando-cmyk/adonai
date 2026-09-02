import styles from "./PageHeader.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

export function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <header className={styles.header}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
