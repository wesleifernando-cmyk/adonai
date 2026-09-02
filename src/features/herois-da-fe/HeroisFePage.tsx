import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { santos } from "../../content/santos";
import list from "../_shared/List.module.css";

export function HeroisFePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Heróis da Fé"
        title="Eles já correram a corrida"
        lead="Santos e beatos para conhecer, admirar e imitar — cada um com uma história e uma frase que ficou."
      />

      <div className={list.stack}>
        {santos.map((s) => (
          <Link key={s.slug} to={`/santos/${s.slug}`} className={`${list.item} ${list.link}`}>
            <div>
              <p className={list.itemEyebrow}>{s.periodo}</p>
              <h2 className={list.itemTitle}>{s.nome}</h2>
              <p style={{ marginTop: 6, color: "var(--text-mute)", fontSize: "0.85rem" }}>
                "{s.frase}"
              </p>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
