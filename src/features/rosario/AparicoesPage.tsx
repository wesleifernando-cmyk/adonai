import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { SantoRetrato } from "../../components/ui/SantoRetrato";
import { aparicoes } from "../../content/rosario/aparicoes";
import list from "../_shared/List.module.css";

export function AparicoesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Nossa Senhora"
        title="Aparições marianas"
        lead="Histórias de quando a Mãe de Jesus se manifestou aos seus filhos na terra."
      />

      <div className={list.stack}>
        {aparicoes.map((a) => (
          <Link
            key={a.slug}
            to={`/rosario/aparicoes/${a.slug}`}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
              <SantoRetrato nome={a.titulo} imagem={a.imagem} size={52} />
              <div style={{ minWidth: 0 }}>
                <p className={list.itemEyebrow}>{a.local} · {a.ano}</p>
                <h2 className={list.itemTitle}>{a.titulo}</h2>
              </div>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
