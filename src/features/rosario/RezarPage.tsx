import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { conjuntoDoDia, type ConjuntoMisterios, type Misterio } from "../../content/rosario/misterios";
import { oracoes } from "../../content/rosario/oracoes";
import styles from "./Rosario.module.css";

type Passo = {
  eyebrow: string;
  titulo: string;
  texto?: string;
  misterio?: Misterio;
  dezena?: boolean;
};

function montarPassos(conjunto: ConjuntoMisterios): Passo[] {
  const passos: Passo[] = [
    { eyebrow: "Para começar", titulo: oracoes.sinalDaCruz.titulo, texto: oracoes.sinalDaCruz.texto },
    { eyebrow: "Para começar", titulo: oracoes.credo.titulo, texto: oracoes.credo.texto },
    { eyebrow: "Conta grande", titulo: oracoes.paiNosso.titulo, texto: oracoes.paiNosso.texto },
    { eyebrow: "1ª conta · pela fé", titulo: oracoes.aveMaria.titulo, texto: oracoes.aveMaria.texto },
    { eyebrow: "2ª conta · pela esperança", titulo: oracoes.aveMaria.titulo, texto: oracoes.aveMaria.texto },
    { eyebrow: "3ª conta · pela caridade", titulo: oracoes.aveMaria.titulo, texto: oracoes.aveMaria.texto },
    { eyebrow: "Conta grande", titulo: oracoes.gloria.titulo, texto: oracoes.gloria.texto },
  ];

  conjunto.misterios.forEach((m, i) => {
    const n = i + 1;
    passos.push({ eyebrow: `${n}º mistério · ${conjunto.nome}`, titulo: m.titulo, misterio: m });
    passos.push({ eyebrow: `${n}ª dezena · conta grande`, titulo: oracoes.paiNosso.titulo, texto: oracoes.paiNosso.texto });
    passos.push({ eyebrow: `${n}ª dezena · 10 contas pequenas`, titulo: oracoes.aveMaria.titulo, texto: oracoes.aveMaria.texto, dezena: true });
    passos.push({ eyebrow: `${n}ª dezena · conta grande`, titulo: oracoes.gloria.titulo, texto: oracoes.gloria.texto });
    passos.push({ eyebrow: `${n}ª dezena`, titulo: oracoes.oMeuJesus.titulo, texto: oracoes.oMeuJesus.texto });
  });

  passos.push({ eyebrow: "Para terminar", titulo: oracoes.salveRainha.titulo, texto: oracoes.salveRainha.texto });
  passos.push({ eyebrow: "Para terminar", titulo: oracoes.oracaoFinal.titulo, texto: oracoes.oracaoFinal.texto });
  passos.push({ eyebrow: "Para terminar", titulo: oracoes.sinalDaCruz.titulo, texto: oracoes.sinalDaCruz.texto });
  return passos;
}

export function RezarPage() {
  const conjunto = useMemo(() => conjuntoDoDia(), []);
  const passos = useMemo(() => montarPassos(conjunto), [conjunto]);
  const [i, setI] = useState(0);
  const [contas, setContas] = useState(0);

  useEffect(() => setContas(0), [i]);
  useEffect(() => window.scrollTo(0, 0), [i]);

  const passo = passos[i];
  const ultimo = i === passos.length - 1;

  return (
    <div className={styles.rezar}>
      <div className={styles.rezarTopo}>
        <Link to="/rosario" className={styles.voltar}>← Rosário</Link>
        <span className={styles.progresso}>{i + 1} / {passos.length}</span>
      </div>

      <div className={styles.barra}>
        <div className={styles.barraPreenchida} style={{ width: `${((i + 1) / passos.length) * 100}%` }} />
      </div>

      <p className="eyebrow">{passo.eyebrow}</p>

      {passo.misterio ? (
        <div className={styles.misterioCard}>
          <h1 className={styles.misterioTitulo}>{passo.misterio.titulo}</h1>
          <p className={styles.misterioRef}>{passo.misterio.referencia}</p>
          <p className={`reading ${styles.misterioTexto}`}>{passo.misterio.meditacao}</p>
        </div>
      ) : (
        <div className={styles.oracaoCard}>
          <h1 className={styles.oracaoTitulo}>{passo.titulo}</h1>
          <p className={`reading ${styles.oracaoTexto}`}>{passo.texto}</p>

          {passo.dezena && (
            <div className={styles.contador}>
              <div className={styles.contas}>
                {Array.from({ length: 10 }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Ave-Maria ${n + 1}`}
                    className={n < contas ? `${styles.conta} ${styles.contaFeita}` : styles.conta}
                    onClick={() => setContas(n + 1 === contas ? n : n + 1)}
                  />
                ))}
              </div>
              <p className={styles.contadorTexto}>Toque a cada Ave-Maria rezada · {contas}/10</p>
            </div>
          )}
        </div>
      )}

      <div className={styles.navCap}>
        <button type="button" className={styles.navBtn} disabled={i === 0} onClick={() => setI((v) => v - 1)}>
          ← Anterior
        </button>
        {ultimo ? (
          <Link to="/rosario" className={styles.navBtnFim}>Terminar</Link>
        ) : (
          <button type="button" className={styles.navBtnFim} onClick={() => setI((v) => v + 1)}>
            Próximo →
          </button>
        )}
      </div>
    </div>
  );
}
