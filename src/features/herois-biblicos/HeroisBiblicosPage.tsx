import { useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { heroisBiblicos } from "../../content/herois-biblicos";
import list from "../_shared/List.module.css";

export function HeroisBiblicosPage() {
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        eyebrow="Heróis Bíblicos"
        title="Gente das Escrituras"
        lead="Homens e mulheres da Bíblia: o que viveram e o que a história deles ensina para hoje."
      />

      <div className={list.stack}>
        {heroisBiblicos.map((h) => {
          const open = aberto === h.slug;
          return (
            <article key={h.slug} className={list.item}>
              <button
                type="button"
                className={list.link}
                style={{ width: "100%", background: "none", border: 0, textAlign: "left", cursor: "pointer" }}
                aria-expanded={open}
                onClick={() => setAberto(open ? null : h.slug)}
              >
                <div>
                  <p className={list.itemEyebrow}>{h.papel} · {h.livro}</p>
                  <h2 className={list.itemTitle}>{h.nome}</h2>
                  {!open && (
                    <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.88rem" }}>
                      {h.resumo}
                    </p>
                  )}
                </div>
                <span className={list.chev} aria-hidden="true">{open ? "–" : "+"}</span>
              </button>

              {open && (
                <>
                  <div className={list.itemBody}>
                    {h.historia.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className={list.itemFoot}>Lição: {h.licao}</p>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
