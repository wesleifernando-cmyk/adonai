import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { LEMA_PRINCIPAL, LEMA_FOGO } from "../../content/lemas";
import { useAuth } from "../../lib/auth/AuthContext";
import styles from "./MaisPage.module.css";

const grupos: { titulo: string; itens: { to: string; label: string; nota?: string }[] }[] = [
  {
    titulo: "Palavra e doutrina",
    itens: [
      { to: "/evangelho", label: "Evangelho do dia" },
      { to: "/biblia", label: "Bíblia" },
      { to: "/rosario", label: "Rosário" },
      { to: "/sagrado-coracao", label: "Sagrado Coração de Jesus" },
      { to: "/catecismo", label: "Catecismo da Igreja" },
      { to: "/documentos", label: "Documentos da Igreja", nota: "em construção" },
      { to: "/noticias", label: "Notícias da fé", nota: "em breve" },
      { to: "/livros", label: "Livros (PDF)" },
      { to: "/audiobooks", label: "Audiobooks" },
      { to: "/lumine", label: "Lumine — Cinema Católico" },
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
    titulo: "Missão e interação",
    itens: [
      { to: "/quiz", label: "Quiz católico", nota: "fase 2" },
      { to: "/testemunhos", label: "Testemunhos", nota: "fase 2" },
      { to: "/catolico-responde", label: "Católico Responde", nota: "fase 3" },
      { to: "/comunidade", label: "Missão Adonai" },
      { to: "/comunidade/musicas", label: "Louvor católico" },
      { to: "/comunidade/pregadores", label: "Pregações de convidados" },
      { to: "/ajude", label: "Ajude-nos" },
      { to: "/admin", label: "Administração", nota: "restrito" },
    ],
  },
];

export function MaisPage() {
  const { usuario, assinaturaAtiva, sair } = useAuth();

  return (
    <div>
      <PageHeader eyebrow="Menu" title="Tudo no Adonai" />

      <section className={styles.grupo}>
        <h2 className={styles.grupoTitulo}>Sua conta</h2>
        <ul className={styles.lista}>
          {usuario ? (
            <>
              <li>
                <div className={styles.row}>
                  <span>{usuario.nome}</span>
                  <span className={styles.right}>
                    <em className={styles.nota}>{assinaturaAtiva ? "assinante" : "sem assinatura"}</em>
                  </span>
                </div>
              </li>
              {!assinaturaAtiva && (
                <li>
                  <Link to="/assinar" className={styles.row}>
                    <span>Assinar agora</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )}
              <li>
                <button className={styles.row} onClick={sair} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer" }}>
                  <span>Sair</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/entrar" className={styles.row}>
                <span>Entrar ou criar conta</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          )}
        </ul>
      </section>

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
        Adonai · versão 0.1 · Missão Adonai. Instagram @go.adonai.
      </p>
    </div>
  );
}
