import { Link, useParams } from "react-router-dom";
import { acharLivro } from "../../content/biblia";
import { SEM_TEXTO } from "../../lib/biblia";
import styles from "./Biblia.module.css";

export function LivroPage() {
  const { livro = "" } = useParams();
  const dados = acharLivro(livro);

  if (!dados || SEM_TEXTO.has(livro)) {
    return (
      <div className={styles.vazio}>
        <p className="eyebrow">Bíblia</p>
        <h1>{dados ? dados.nome : "Livro não encontrado"}</h1>
        <p>
          {dados
            ? "Este é um livro deuterocanônico. O texto entra assim que a revisão da Missão Adonai avançar."
            : "Esse livro não está no acervo."}
        </p>
        <Link to="/biblia" className={styles.voltar}>← Todos os livros</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/biblia" className={styles.voltar}>← Bíblia</Link>
      <h1 className={styles.livroTitulo}>{dados.nome}</h1>
      <p className={styles.livroSub}>{dados.capitulos} capítulos · escolha um</p>

      <div className={styles.capGrade}>
        {Array.from({ length: dados.capitulos }, (_, i) => i + 1).map((n) => (
          <Link key={n} to={`/biblia/${livro}/${n}`} className={styles.capBtn}>
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}
