import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { santos } from "../../content/santos";
import list from "../_shared/List.module.css";

export function DoutoresPage() {
  const doutores = santos.filter((s) => s.doutor);

  return (
    <div>
      <PageHeader
        eyebrow="Doutores da Igreja"
        title="Mestres da doutrina"
        lead="Santos reconhecidos pela Igreja pela solidez do seu ensino. A Igreja tem 37 doutores; aqui começam alguns."
      />

      <div className={list.nota}>
        <strong>Em ampliação.</strong> Vamos incluir todos os 37 doutores, com um resumo do que
        cada um contribuiu (Escritura, oração, teologia, missão).
      </div>

      <div className={list.stack}>
        {doutores.map((s) => (
          <Link key={s.slug} to={`/santos/${s.slug}`} className={`${list.item} ${list.link}`}>
            <div>
              <p className={list.itemEyebrow}>{s.periodo}</p>
              <h2 className={list.itemTitle}>{s.nome}</h2>
              <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.88rem" }}>
                {s.resumo}
              </p>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
