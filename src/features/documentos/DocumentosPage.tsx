import { PageHeader } from "../../components/ui/PageHeader";
import list from "../_shared/List.module.css";

const documentos = [
  { titulo: "Rerum Novarum", autor: "Leão XIII · 1891", tema: "O trabalho e a questão social" },
  { titulo: "Humani Generis", autor: "Pio XII · 1950", tema: "Fé e ciência" },
  { titulo: "Lumen Gentium", autor: "Concílio Vaticano II · 1964", tema: "A Igreja" },
  { titulo: "Dei Verbum", autor: "Concílio Vaticano II · 1965", tema: "A Revelação e a Escritura" },
  { titulo: "Gaudium et Spes", autor: "Concílio Vaticano II · 1965", tema: "A Igreja no mundo de hoje" },
  { titulo: "Humanae Vitae", autor: "Paulo VI · 1968", tema: "O amor conjugal e a vida" },
  { titulo: "Redemptor Hominis", autor: "João Paulo II · 1979", tema: "Cristo, centro da história" },
  { titulo: "Deus Caritas Est", autor: "Bento XVI · 2005", tema: "O amor de Deus e a caridade" },
  {
    titulo: "Evangelii Gaudium",
    autor: "Francisco · 2013",
    tema: "A alegria de evangelizar",
    url: "https://www.vatican.va/content/dam/francesco/pdf/apost_exhortations/documents/papa-francesco_esortazione-ap_20131124_evangelii-gaudium_po.pdf",
  },
  {
    titulo: "Laudato Si'",
    autor: "Francisco · 2015",
    tema: "O cuidado da casa comum",
    url: "https://www.vatican.va/content/dam/francesco/pdf/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si_po.pdf",
  },
];

export function DocumentosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Documentos da Igreja"
        title="A voz do Magistério"
        lead="Encíclicas e documentos conciliares que ajudam a entender a fé e a vida cristã."
      />

      <div className={list.nota}>
        <strong>Em construção.</strong> Os textos completos estão no site oficial da Santa Sé
        (vatican.va), de uso permitido com atribuição. Vamos trazer resumos próprios e o link de
        cada documento.
      </div>

      <div className={list.stack}>
        {documentos.map((d) =>
          d.url ? (
            <a
              key={d.titulo}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${list.item} ${list.link}`}
              style={{ alignItems: "center" }}
            >
              <div>
                <p className={list.itemEyebrow}>{d.autor}</p>
                <h2 className={list.itemTitle}>{d.titulo}</h2>
                <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.9rem" }}>{d.tema}</p>
              </div>
              <span className={list.chev} aria-hidden="true">↗</span>
            </a>
          ) : (
            <article key={d.titulo} className={list.item}>
              <p className={list.itemEyebrow}>{d.autor}</p>
              <h2 className={list.itemTitle}>{d.titulo}</h2>
              <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.9rem" }}>{d.tema}</p>
            </article>
          )
        )}
      </div>
    </div>
  );
}
