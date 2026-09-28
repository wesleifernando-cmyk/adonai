import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { audiobooks } from "../../content/comunidade/audiobooks";
import list from "../_shared/List.module.css";
import styles from "./Comunidade.module.css";

export function AudiobooksPage() {
  return (
    <div>
      <Link to="/comunidade" className={styles.voltar}>← Comunidade</Link>

      <PageHeader
        eyebrow="Audiobooks"
        title="Livros católicos para ouvir"
        lead="Só livros católicos, sempre com crédito ao autor e ao canal. Bom para ouvir no trajeto, na faxina ou antes de dormir."
      />

      <div className={list.stack}>
        {audiobooks.map((a) => (
          <Link
            key={a.slug}
            to={`/comunidade/audiobooks/${a.slug}`}
            className={`${list.item} ${list.link}`}
            style={{ alignItems: "center" }}
          >
            <div style={{ minWidth: 0 }}>
              <p className={list.itemEyebrow}>{a.autor} · {a.faixas.length} {a.faixas.length > 1 ? "faixas" : "faixa"}</p>
              <h2 className={list.itemTitle}>{a.titulo}</h2>
            </div>
            <span className={list.chev} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      <p className={styles.creditoFinal}>
        Conhece outro audiobook católico bom? Manda o título e o link do YouTube pra equipe da
        Missão Adonai acrescentar.
      </p>
    </div>
  );
}
