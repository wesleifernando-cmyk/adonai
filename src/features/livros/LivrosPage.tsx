import { PageHeader } from "../../components/ui/PageHeader";
import { livros } from "../../content/livros";
import list from "../_shared/List.module.css";

export function LivrosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Biblioteca"
        title="Livros para ler"
        lead="Só livros católicos, de fontes oficiais ou de domínio público. Link direto pra fonte — nada hospedado aqui."
      />

      <div className={list.stack}>
        {livros.map((l) => (
          <a
            key={l.titulo}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>{l.autor} · {l.formato} · {l.fonte}</p>
              <h2 className={list.itemTitle}>{l.titulo}</h2>
              <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.88rem" }}>{l.descricao}</p>
            </div>
            <span className={list.chev} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className={list.nota} style={{ marginTop: 20 }}>
        <strong>Sempre crescendo.</strong> Conhece outro livro católico de domínio público ou
        oficial da Igreja que devia estar aqui? Manda o título pra equipe da Missão Adonai.
      </div>
    </div>
  );
}
