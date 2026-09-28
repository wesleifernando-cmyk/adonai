import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { passosConsagracao, atoDeConsagracao } from "../../content/sagrado-coracao/consagracao";
import styles from "./SagradoCoracao.module.css";

export function ConsagracaoPage() {
  return (
    <div>
      <Link to="/sagrado-coracao" className={styles.voltar}>← Sagrado Coração</Link>

      <PageHeader
        eyebrow="Método"
        title="Como se consagrar ao Sagrado Coração"
        lead="Um caminho simples pra viver a entrega — pessoal, em família ou na paróquia."
      />

      <ol className={styles.passos}>
        {passosConsagracao.map((p) => (
          <li key={p.n} className={styles.passo}>
            <span className={styles.passoNum}>{p.n}</span>
            <div>
              <h3 className={styles.passoTitulo}>{p.titulo}</h3>
              <p className={styles.passoTexto}>{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.oracaoCard}>
        <h2 className={styles.oracaoTitulo}>{atoDeConsagracao.titulo}</h2>
        <p className={styles.oracaoAutor}>{atoDeConsagracao.autor}</p>
        <p className={`reading ${styles.oracaoTexto}`}>{atoDeConsagracao.texto}</p>
      </div>
    </div>
  );
}
