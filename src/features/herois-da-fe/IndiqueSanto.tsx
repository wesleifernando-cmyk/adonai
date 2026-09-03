import { useEffect, useState } from "react";
import styles from "./IndiqueSanto.module.css";

const KEY = "adonai:santos-sugeridos";

function ler(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Sugestão de santos para entrar na galeria. Por enquanto fica salvo
 *  neste aparelho; na Fase 2 vai para a equipe da Missão Adonai. */
export function IndiqueSanto() {
  const [nome, setNome] = useState("");
  const [lista, setLista] = useState<string[]>([]);
  const [ok, setOk] = useState(false);

  useEffect(() => setLista(ler()), []);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const v = nome.trim();
    if (v.length < 3) return;
    const nova = [v, ...lista.filter((x) => x.toLowerCase() !== v.toLowerCase())].slice(0, 30);
    setLista(nova);
    try {
      localStorage.setItem(KEY, JSON.stringify(nova));
    } catch {
      /* sem armazenamento — segue só em memória */
    }
    setNome("");
    setOk(true);
  }

  return (
    <section className={styles.box}>
      <p className="eyebrow">Indique um santo</p>
      <h2 className={styles.titulo}>Falta algum santo aqui?</h2>
      <p className={styles.texto}>
        Diga qual santo ou beato da Igreja você quer ver na galeria. A equipe da Missão Adonai vai
        pesquisar a história dele e adicionar.
      </p>

      <form className={styles.form} onSubmit={enviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setOk(false);
          }}
          placeholder="Ex.: Santa Dulce dos Pobres"
          aria-label="Nome do santo"
          maxLength={80}
        />
        <button type="submit">Indicar</button>
      </form>

      {ok && <p className={styles.ok}>Anotado! Sua sugestão foi registrada.</p>}

      {lista.length > 0 && (
        <div className={styles.jaIndicados}>
          <p className={styles.jaTitulo}>Já indicados neste aparelho</p>
          <ul>
            {lista.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
