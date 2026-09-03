import { Link, useParams } from "react-router-dom";
import { santos } from "../../content/santos";
import { SantoRetrato } from "../../components/ui/SantoRetrato";
import { CompartilharBtn } from "../../components/ui/CompartilharBtn";
import styles from "./Santos.module.css";

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

function festaLonga(mmdd: string): string {
  const [mm, dd] = mmdd.split("-").map(Number);
  return `${dd} de ${MESES[mm - 1]}`;
}

export function SantoPage() {
  const { slug } = useParams();
  const santo = santos.find((s) => s.slug === slug);

  if (!santo) {
    return (
      <div className={styles.notFound}>
        <p className="eyebrow">Santo não encontrado</p>
        <h1>Ainda não temos esse santo no acervo</h1>
        <Link to="/santos" className={styles.cta}>← Ver todos os santos</Link>
      </div>
    );
  }

  return (
    <article className={styles.detail}>
      <Link to="/santos" className={styles.back}>← Santos</Link>

      <div className={styles.retrato}>
        <SantoRetrato nome={santo.nome} imagem={santo.imagem} destaque />
        {santo.imagemCredito && <p className={styles.credito}>{santo.imagemCredito}</p>}
      </div>

      <p className="eyebrow">Memória: {festaLonga(santo.festa)}</p>
      <h1 className={styles.name}>{santo.nome}</h1>
      <p className={styles.subtitle}>{santo.titulo} · {santo.periodo}</p>

      <div className={styles.chips}>
        {santo.jovem && <span className={styles.chip}>Jovem de referência</span>}
        {santo.doutor && <span className={styles.chip}>Doutor(a) da Igreja</span>}
        {santo.padroeiro && <span className={styles.chip}>Padroeiro: {santo.padroeiro}</span>}
      </div>

      <blockquote className={styles.quote}>
        <p>"{santo.frase}"</p>
        <cite>{santo.fonteFrase}</cite>
      </blockquote>

      <div className={`reading ${styles.body}`}>
        {santo.historia.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className={styles.acoes}>
        <CompartilharBtn
          titulo={`${santo.nome} — ${santo.titulo}`}
          texto={`"${santo.frase}" (${santo.fonteFrase})`}
          path={`/santos/${santo.slug}`}
        />
        <span className={styles.acoesNota}>Curtir e comentar: em breve (Fase 2)</span>
      </div>

      <p className={styles.rev}>
        Texto biográfico de curadoria da Missão Adonai, a partir de fontes históricas de domínio
        público. Sujeito a revisão.
      </p>
    </article>
  );
}
