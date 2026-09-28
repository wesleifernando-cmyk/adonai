import { useEffect, useState } from "react";
import styles from "./Comunidade.module.css";

const KEY = "adonai:pregacoes-sugeridas";

type Sugestao = { texto: string; link: string };

function ler(): Sugestao[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Sugestao[]) : [];
  } catch {
    return [];
  }
}

/** Sugestão de pregações. Fica salva neste aparelho; a equipe confere
 *  no dispositivo e adiciona ao acervo (ver README: "Indique uma pregação"). */
export function IndiquePregacao() {
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [lista, setLista] = useState<Sugestao[]>([]);
  const [ok, setOk] = useState(false);

  useEffect(() => setLista(ler()), []);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (texto.trim().length < 3 || link.trim().length < 8) return;
    const nova = [{ texto: texto.trim(), link: link.trim() }, ...lista].slice(0, 40);
    setLista(nova);
    try {
      localStorage.setItem(KEY, JSON.stringify(nova));
    } catch {
      /* sem armazenamento — segue só em memória */
    }
    setTexto("");
    setLink("");
    setOk(true);
  }

  return (
    <section className={styles.indique}>
      <p className="eyebrow">Indique uma pregação</p>
      <h2 className={styles.indiqueTitulo}>Falta alguma pregação aqui?</h2>
      <p className={styles.indiqueTexto}>
        Escreve o nome do pregador ou da pregação e cola o link do YouTube. A equipe da Missão
        Adonai confere e adiciona ao acervo.
      </p>

      <form className={styles.indiqueForm} onSubmit={enviar}>
        <input
          type="text"
          value={texto}
          onChange={(e) => { setTexto(e.target.value); setOk(false); }}
          placeholder="Nome do pregador ou da pregação"
          aria-label="Nome do pregador ou da pregação"
          maxLength={100}
        />
        <input
          type="url"
          value={link}
          onChange={(e) => { setLink(e.target.value); setOk(false); }}
          placeholder="Link do YouTube"
          aria-label="Link do YouTube"
          maxLength={200}
        />
        <button type="submit">Indicar</button>
      </form>

      {ok && <p className={styles.indiqueOk}>Anotado! Sua sugestão foi registrada.</p>}

      {lista.length > 0 && (
        <div className={styles.indiqueLista}>
          <p className={styles.indiqueListaTitulo}>Já indicadas neste aparelho</p>
          <ul>
            {lista.map((s, i) => (
              <li key={i}>
                <strong>{s.texto}</strong> — <a href={s.link} target="_blank" rel="noopener noreferrer">{s.link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
