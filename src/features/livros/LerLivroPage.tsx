import { Link, useParams } from "react-router-dom";
import { livros } from "../../content/livros";
import styles from "./LerLivroPage.module.css";

export function LerLivroPage() {
  const { slug = "" } = useParams();
  const livro = livros.find((l) => l.slug === slug && l.local);

  if (!livro) {
    return (
      <div>
        <Link to="/livros">← Biblioteca</Link>
        <p>Livro não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/livros">← Biblioteca</Link>

      <div className={styles.topo} style={{ marginTop: 12 }}>
        <div className={styles.info}>
          <h1 className={styles.titulo}>{livro.titulo}</h1>
          <p className={styles.autor}>{livro.autor}</p>
        </div>
        <a className={styles.baixar} href={livro.url} download>
          ⬇ Baixar PDF
        </a>
      </div>

      <object data={`${livro.url}#toolbar=0`} type="application/pdf" className={styles.leitor}>
        <p className={styles.aviso}>
          Seu navegador não conseguiu abrir o leitor aqui.{" "}
          <a href={livro.url} target="_blank" rel="noopener noreferrer">
            Abrir o PDF em outra aba
          </a>
          .
        </p>
      </object>

      <p className={styles.aviso}>Fonte: {livro.fonte}</p>
    </div>
  );
}
