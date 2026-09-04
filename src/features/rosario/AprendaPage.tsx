import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { RosaryDiagram } from "./RosaryDiagram";
import styles from "./Rosario.module.css";

const passos = [
  {
    n: 1,
    titulo: "Segure o crucifixo",
    texto: "Faça o Sinal da Cruz e, em seguida, reze o Credo (Creio em Deus Pai...).",
  },
  {
    n: 2,
    titulo: "Primeira conta grande",
    texto: "Reze um Pai-Nosso.",
  },
  {
    n: 3,
    titulo: "As três contas pequenas",
    texto: "Reze uma Ave-Maria em cada uma, pedindo o aumento da fé, da esperança e da caridade.",
  },
  {
    n: 4,
    titulo: "De volta à medalha",
    texto: "Reze um Glória ao Pai.",
  },
  {
    n: 5,
    titulo: "Entrando no laço: 1º mistério",
    texto: "Anuncie o primeiro mistério do dia (veja qual é em \"Estudo dos mistérios\") e reze um Pai-Nosso na conta grande.",
  },
  {
    n: 6,
    titulo: "A dezena",
    texto: "Reze 10 Ave-Marias seguidas, meditando nesse mistério — sem pressa, uma conta pequena por Ave-Maria.",
  },
  {
    n: 7,
    titulo: "Fechando a dezena",
    texto: "Reze um Glória ao Pai e, se quiser, a jaculatória \"Ó meu Jesus\", pedida por Nossa Senhora em Fátima.",
  },
  {
    n: 8,
    titulo: "Repita para os outros 4 mistérios",
    texto: "Cada dezena segue o mesmo caminho: conta grande (Pai-Nosso), dez pequenas (Ave-Marias), Glória.",
  },
  {
    n: 9,
    titulo: "Para terminar",
    texto: "Depois da 5ª dezena, reze a Salve-Rainha e a oração final. Termine com o Sinal da Cruz.",
  },
];

export function AprendaPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Para quem está começando"
        title="Aprenda a rezar o Rosário"
        lead="Nove passos simples, na ordem em que as contas vêm na mão. Sem pressa — o Rosário se aprende rezando."
      />

      <div className={styles.diagrama}>
        <RosaryDiagram />
      </div>

      <ol className={styles.passos}>
        {passos.map((p) => (
          <li key={p.n} className={styles.passo}>
            <span className={styles.passoNum}>{p.n}</span>
            <div>
              <h3 className={styles.passoTitulo}>{p.titulo}</h3>
              <p className={styles.passoTexto}>{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link to="/rosario/rezar" className={styles.cta}>Já entendi — rezar agora →</Link>
    </div>
  );
}
