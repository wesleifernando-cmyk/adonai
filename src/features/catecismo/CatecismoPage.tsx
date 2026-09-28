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

      <a
        href="https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html"
        target="_blank"
        rel="noopener noreferrer"
        className={list.item}
        style={{ display: "block", marginBottom: 16, borderColor: "rgba(242,176,30,0.3)" }}
      >
        <p className={list.itemEyebrow}>Oficial · vatican.va</p>
        <h2 className={list.itemTitle}>Ler o Compêndio do Catecismo ↗</h2>
        <p style={{ marginTop: 6, color: "var(--text-dim)", fontFamily: "var(--font-read)" }}>
          Síntese oficial, em perguntas e respostas, publicada pelo próprio Vaticano — já dá pra
          ler agora.
        </p>
      </a>

      <div className={list.nota}>
        <strong>Texto completo em construção.</strong> O Catecismo integral é © Libreria Editrice
        Vaticana / Loyola. Estamos verificando a forma correta de disponibilizar o texto inteiro
        (citação por parágrafo ou pedido de autorização). A estrutura abaixo mostra como vai
        ficar a navegação.
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
