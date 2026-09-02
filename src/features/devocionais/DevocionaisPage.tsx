import { PageHeader } from "../../components/ui/PageHeader";
import { devocionais } from "../../content/devocionais";
import { pickForToday } from "../../lib/dates";
import list from "../_shared/List.module.css";

export function DevocionaisPage() {
  const hoje = pickForToday(devocionais);

  return (
    <div>
      <PageHeader
        eyebrow="Devocionais"
        title="Reflexões para rezar"
        lead="Textos curtos do grupo de oração: uma passagem, uma meditação e uma oração para levar no dia."
      />

      <div className={list.stack}>
        {devocionais.map((d) => {
          const destaque = d.titulo === hoje.titulo;
          return (
            <article
              key={d.titulo}
              className={list.item}
              style={destaque ? { borderColor: "rgba(255,90,44,0.3)" } : undefined}
            >
              <p className={list.itemEyebrow}>
                {destaque ? "Devocional de hoje · " : ""}{d.tema} · {d.passagem}
              </p>
              <h2 className={list.itemTitle}>{d.titulo}</h2>
              <div className={list.itemBody}>
                {d.texto.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className={list.itemFoot}>Oração: {d.oracao}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
