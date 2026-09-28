import { PageHeader } from "../../components/ui/PageHeader";
import { livros } from "../../content/livros";
import list from "../_shared/List.module.css";

export function LivrosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Biblioteca"
        title="Livros para ler"
        lead="Só livros católicos. Os PDFs oficiais do Vaticano ficam guardados aqui mesmo — abrem e baixam direto do site."
      />

      <div className={list.stack}>
        {livros.map((l) => (
          <a
            key={l.titulo}
            href={l.url}
            target={l.local ? undefined : "_blank"}
            rel={l.local ? undefined : "noopener noreferrer"}
            download={l.local ? true : undefined}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>
                {l.autor} · {l.formato}{l.local ? " · guardado aqui" : ` · ${l.fonte}`}
              </p>
              <h2 className={list.itemTitle}>{l.titulo}</h2>
              <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.88rem" }}>{l.descricao}</p>
            </div>
            <span className={list.chev} aria-hidden="true">{l.local ? "⬇" : "↗"}</span>
          </a>
        ))}
      </div>

      <div className={list.nota} style={{ marginTop: 20 }}>
        <strong>Por que nem todo livro é PDF pra baixar?</strong> Só guardamos o PDF aqui quando o
        próprio Vaticano já distribui o documento como arquivo (Laudato Si', Evangelii Gaudium,
        Código de Direito Canônico). Quando a fonte só existe como página — sem PDF nenhum — ou é
        obra de terceiro sem autorização pra redistribuir (biografias, livros de outras
        editoras), linkamos pra fonte oficial em vez de copiar o conteúdo.
      </div>

      <div className={list.nota}>
        <strong>Sempre crescendo.</strong> Conhece outro livro católico de domínio público ou
        oficial da Igreja que devia estar aqui? Manda o título pra equipe da Missão Adonai.
      </div>
    </div>
  );
}
