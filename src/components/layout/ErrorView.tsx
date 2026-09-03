import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { BrandMark } from "../ui/Brand";
import styles from "./ErrorView.module.css";

export function ErrorView() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className={styles.wrap}>
      <BrandMark size={64} />
      <p className="eyebrow">{is404 ? "Página não encontrada" : "Algo saiu do lugar"}</p>
      <h1 className={styles.title}>
        {is404 ? "Esse caminho ainda não existe" : "Tivemos um imprevisto"}
      </h1>
      <p className={styles.text}>
        {is404
          ? "O endereço que você abriu não faz parte do app — talvez seja uma seção que ainda está sendo construída."
          : "Recarregue a página. Se continuar, avise a equipe do grupo de oração."}
      </p>
      <Link to="/" className={styles.btn}>Voltar para o início</Link>
    </div>
  );
}
