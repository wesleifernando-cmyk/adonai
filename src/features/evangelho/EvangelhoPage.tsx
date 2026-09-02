import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { getLiturgiaHoje, type LiturgiaDia } from "../../lib/api/liturgia";
import { todayLong } from "../../lib/dates";
import styles from "./EvangelhoPage.module.css";

/** A API cola o número do versículo na palavra ("38Jesus"). Separa e marca. */
function Paragrafos({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/\n+/).map((par, i) => {
        const partes = par.split(/(\d{1,3})(?=[A-Za-zÀ-ú"])/g);
        return (
          <p key={i}>
            {partes.map((frag, j) =>
              /^\d{1,3}$/.test(frag) ? (
                <sup key={j} className={styles.vers}>{frag}</sup>
              ) : (
                <span key={j}>{frag}</span>
              )
            )}
          </p>
        );
      })}
    </>
  );
}

export function EvangelhoPage() {
  const [data, setData] = useState<LiturgiaDia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    getLiturgiaHoje(ctrl.signal)
      .then(setData)
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return (
    <div className={styles.page}>
      <PageHeader eyebrow={`Evangelho · ${todayLong()}`} title="A Palavra de hoje" />

      {loading && <p className={styles.status}>Buscando a liturgia do dia…</p>}

      {!loading && data && (
        <>
          {data.celebracao && (
            <p className={styles.celebracao}>
              {data.celebracao}
              {data.cor && <span className={styles.cor}> · cor {data.cor}</span>}
            </p>
          )}

          {data.evangelho ? (
            <article className={styles.leitura}>
              {data.evangelho.titulo && <p className={styles.leituraTitulo}>{data.evangelho.titulo}</p>}
              <p className={styles.ref}>{data.evangelho.referencia}</p>
              <div className={`reading ${styles.texto}`}>
                <Paragrafos texto={data.evangelho.texto} />
              </div>
            </article>
          ) : (
            <p className={styles.status}>Não foi possível carregar o Evangelho agora.</p>
          )}

          {data.salmo && (
            <details className={styles.extra}>
              <summary>Salmo responsorial · {data.salmo.referencia}</summary>
              <div className={`reading ${styles.texto}`}>
                <Paragrafos texto={data.salmo.texto} />
              </div>
            </details>
          )}
          {data.primeiraLeitura && (
            <details className={styles.extra}>
              <summary>1ª leitura · {data.primeiraLeitura.referencia}</summary>
              <div className={`reading ${styles.texto}`}>
                <Paragrafos texto={data.primeiraLeitura.texto} />
              </div>
            </details>
          )}

          {data.fonte === "offline" && (
            <p className={styles.aviso}>
              Você está sem conexão com a liturgia do dia. Acima está uma passagem de reserva
              (tradução em domínio público) só para a oração não parar.
            </p>
          )}
          {data.fonte === "api" && (
            <p className={styles.aviso}>
              Liturgia fornecida por API comunitária. A fonte oficial e a tradução ainda serão
              definidas.
            </p>
          )}
        </>
      )}
    </div>
  );
}
