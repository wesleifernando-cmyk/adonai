import { PageHeader } from "../../components/ui/PageHeader";
import { filmesLumine, LUMINE_URL, type FilmeLumine } from "../../content/lumine";
import styles from "./LuminePage.module.css";

const categorias: FilmeLumine["categoria"][] = ["Vida dos Santos", "Nossa Senhora", "Fé e espiritualidade"];

export function LuminePage() {
  return (
    <div>
      <PageHeader eyebrow="Cinema católico" title="Lumine" />

      <div className={styles.hero}>
        <p className={styles.heroFrase}>
          Histórias que inspiram a fé e aproximam você da vida dos santos.
        </p>
        <a href={LUMINE_URL} target="_blank" rel="noopener noreferrer" className={styles.heroBtn}>
          Conhecer a Lumine e assinar ↗
        </a>
      </div>

      {categorias.map((cat) => {
        const filmes = filmesLumine.filter((f) => f.categoria === cat);
        if (filmes.length === 0) return null;
        return (
          <section key={cat} className={styles.categoria}>
            <h2 className={styles.categoriaTitulo}>{cat}</h2>
            <div className={styles.grid}>
              {filmes.map((f) => (
                <a
                  key={f.titulo}
                  href={LUMINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  <div className={styles.capa} aria-hidden="true">
                    <span className={styles.capaTitulo}>{f.titulo}</span>
                  </div>
                  <div className={styles.corpo}>
                    <p className={styles.tema}>{f.tema}</p>
                    <p className={styles.desc}>{f.descricao}</p>
                    <span className={styles.verBtn}>Ver na Lumine ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <div className={styles.rodape}>
        <p className={styles.rodapeTexto}>
          A reprodução acontece dentro da Lumine, com a assinatura de cada um. Os links dos
          cartões acima levam pra Lumine — como o site não deixa acessar página de filme sem
          login, todo botão abre a Lumine, de onde dá pra buscar o título.
        </p>
        <a href={LUMINE_URL} target="_blank" rel="noopener noreferrer" className={styles.rodapeBtn}>
          Explorar todo o catálogo da Lumine ↗
        </a>
      </div>

      <p className={styles.nota}>
        A Missão Adonai não é afiliada à Lumine — é só uma indicação de conteúdo católico que
        vale a pena.
      </p>
    </div>
  );
}
