import { PageHeader } from "../../components/ui/PageHeader";
import { antigoTestamento, novoTestamento, type LivroBiblico } from "../../content/biblia";
import styles from "./BibliaPage.module.css";

function Estante({ titulo, livros }: { titulo: string; livros: LivroBiblico[] }) {
  return (
    <section className={styles.estante}>
      <h2 className={styles.estanteTitulo}>{titulo}</h2>
      <ul className={styles.grade}>
        {livros.map((l) => (
          <li key={l.slug}>
            <button type="button" className={styles.livro} aria-disabled="true">
              <span className={styles.abrev}>{l.abrev}</span>
              <span className={styles.nome}>{l.nome}</span>
              <span className={styles.caps}>{l.capitulos} cap.</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BibliaPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Bíblia · 73 livros"
        title="As Escrituras"
        lead="A estrutura completa do cânon católico já está aqui. O texto de cada capítulo entra assim que definirmos a tradução."
      />

      <div className={styles.nota}>
        <strong>Em construção.</strong> Quase toda tradução da Bíblia em português é protegida por
        direitos autorais (Ave-Maria, CNBB, Pastoral). Estamos escolhendo entre uma versão de uso
        livre e um pedido de licença. Enquanto isso, a navegação já fica pronta.
      </div>

      <Estante titulo="Antigo Testamento" livros={antigoTestamento} />
      <Estante titulo="Novo Testamento" livros={novoTestamento} />
    </div>
  );
}
