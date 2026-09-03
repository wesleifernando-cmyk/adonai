import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { antigoTestamento, novoTestamento, type LivroBiblico } from "../../content/biblia";
import { SEM_TEXTO, TRADUCAO_ATUAL } from "../../lib/biblia";
import styles from "./Biblia.module.css";

function Estante({ titulo, livros }: { titulo: string; livros: LivroBiblico[] }) {
  return (
    <section className={styles.estante}>
      <h2 className={styles.estanteTitulo}>{titulo}</h2>
      <ul className={styles.grade}>
        {livros.map((l) => {
          const semTexto = SEM_TEXTO.has(l.slug);
          return (
            <li key={l.slug}>
              {semTexto ? (
                <span className={`${styles.livro} ${styles.livroOff}`} title="Texto em breve">
                  <span className={styles.abrev}>{l.abrev}</span>
                  <span className={styles.nome}>{l.nome}</span>
                  <span className={styles.caps}>em breve</span>
                </span>
              ) : (
                <Link to={`/biblia/${l.slug}`} className={styles.livro}>
                  <span className={styles.abrev}>{l.abrev}</span>
                  <span className={styles.nome}>{l.nome}</span>
                  <span className={styles.caps}>{l.capitulos} cap.</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function BibliaPage() {
  return (
    <div>
      <PageHeader
        eyebrow={`Bíblia · ${TRADUCAO_ATUAL.sigla}`}
        title="As Escrituras"
        lead="Escolha um livro para ler. Cânon católico completo; os 7 livros deuterocanônicos entram assim que a revisão avançar."
      />

      <div className={styles.nota}>
        <strong>{TRADUCAO_ATUAL.nome}.</strong> {TRADUCAO_ATUAL.nota}
      </div>

      <Estante titulo="Antigo Testamento" livros={antigoTestamento} />
      <Estante titulo="Novo Testamento" livros={novoTestamento} />
    </div>
  );
}
