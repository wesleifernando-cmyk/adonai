import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { livros } from "../../content/livros";
import list from "../_shared/List.module.css";

export function LivrosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Biblioteca"
        title="Livros para ler"
        lead="Só livros de verdade, em PDF, guardados aqui mesmo — abrem num leitor dentro do site, onde dá pra folhear, selecionar e grifar trechos."
      />

      <div className={list.stack}>
        {livros.map((l) => (
          <Link
            key={l.slug}
            to={`/livros/ler/${l.slug}`}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>{l.autor} · ler aqui</p>
              <h2 className={list.itemTitle}>{l.titulo}</h2>
              <p style={{ marginTop: 6, color: "var(--text-dim)", fontSize: "0.88rem" }}>{l.descricao}</p>
            </div>
            <span className={list.chev} aria-hidden="true">📖</span>
          </Link>
        ))}
      </div>

      <div className={list.nota} style={{ marginTop: 20 }}>
        <strong>Sempre crescendo.</strong> Conhece outro livro católico de domínio público ou
        oficial da Igreja que devia estar aqui? Manda o título pra equipe da Missão Adonai.
      </div>
    </div>
  );
}
