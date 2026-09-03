import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { LEMA_PRINCIPAL, LEMA_FOGO } from "../../content/lemas";
import styles from "./MaisPage.module.css";

const grupos: { titulo: string; itens: { to: string; label: string; nota?: string }[] }[] = [
  {
    titulo: "Palavra e doutrina",
    itens: [
      { to: "/evangelho", label: "Evangelho do dia" },
      { to: "/biblia", label: "Bíblia", nota: "em construção" },
      { to: "/catecismo", label: "Catecismo da Igreja", nota: "em construção" },
      { to: "/documentos", label: "Documentos da Igreja", nota: "em construção" },
    ],
  },
  {
    titulo: "Testemunhas",
    itens: [
      { to: "/santos", label: "Santos" },
      { to: "/herois-da-fe", label: "Heróis da Fé" },
      { to: "/herois-biblicos", label: "Heróis Bíblicos" },
      { to: "/doutores", label: "Doutores da Igreja" },
      { to: "/devocionais", label: "Devocionais" },
    ],
  },
  {
    titulo: "Comunidade e interação",
    itens: [
      { to: "/quiz", label: "Quiz católico", nota: "fase 2" },
      { to: "/catolico-responde", label: "Católico Responde", nota: "fase 3" },
      { to: "/comunidade", label: "Grupo de oração Adonai", nota: "fase 2" },
      { to: "/admin", label: "Administração", nota: "restrito" },
    ],
  },
];

export function MaisPage() {
  return (
    <div>
      <PageHeader eyebrow="Menu" title="Tudo no Adonai" />

      {grupos.map((g) => (
        <section key={g.titulo} className={styles.grupo}>
          <h2 className={styles.grupoTitulo}>{g.titulo}</h2>
          <ul className={styles.lista}>
            {g.itens.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className={styles.row}>
                  <span>{it.label}</span>
                  <span className={styles.right}>
                    {it.nota && <em className={styles.nota}>{it.nota}</em>}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className={styles.lemas}>
        <p className={styles.lemaBig}>{LEMA_PRINCIPAL}</p>
        <p className={styles.lemaFogo}>{LEMA_FOGO}</p>
      </div>

      <p className={styles.rodape}>
        Adonai · versão 0.1 · projeto do grupo de oração. Instagram @go.adonai.
      </p>
    </div>
  );
}
