import { PageHeader } from "../../components/ui/PageHeader";
import list from "../_shared/List.module.css";

const partes = [
  { n: "I", titulo: "A profissão da fé", desc: "O Credo, artigo por artigo — quem é Deus, a criação, Cristo, a Igreja." },
  { n: "II", titulo: "A celebração do mistério cristão", desc: "A liturgia e os sete sacramentos." },
  { n: "III", titulo: "A vida em Cristo", desc: "A vocação à felicidade, os mandamentos, a graça, o pecado, as virtudes." },
  { n: "IV", titulo: "A oração cristã", desc: "O que é rezar e o Pai-Nosso explicado pedido a pedido." },
];

export function CatecismoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catecismo da Igreja Católica"
        title="O que a Igreja crê e ensina"
        lead="A síntese oficial da fé católica, organizada em quatro partes."
      />

      <div className={list.nota}>
        <strong>Em construção.</strong> O texto do Catecismo é © Libreria Editrice Vaticana /
        Loyola. Estamos verificando a forma correta de disponibilizar (link oficial, citação por
        parágrafo ou pedido de autorização). A estrutura abaixo já mostra como será navegar.
      </div>

      <div className={list.stack}>
        {partes.map((p) => (
          <article key={p.n} className={list.item}>
            <p className={list.itemEyebrow}>Parte {p.n}</p>
            <h2 className={list.itemTitle}>{p.titulo}</h2>
            <p style={{ marginTop: 8, color: "var(--text-dim)", fontFamily: "var(--font-read)" }}>
              {p.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
