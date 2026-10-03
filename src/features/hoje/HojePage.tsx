import { Link } from "react-router-dom";
import { BrandLogo } from "../../components/ui/Brand";
import { ChurchMark } from "../../components/ui/ChurchMark";
import { LemaFogo } from "../../components/ui/LemaFogo";
import { IntroMusica } from "../../components/ui/IntroMusica";
import { santoDoDia, santoJovemDoDia } from "../../content/santos";
import { devocionais } from "../../content/devocionais";
import { conjuntoDoDia } from "../../content/rosario/misterios";
import { capaDesperta, fotosDesperta } from "../../content/galerias";
import { pickForToday, todayLong } from "../../lib/dates";
import styles from "./HojePage.module.css";

const atalhos = [
  { to: "/biblia", label: "Bíblia", desc: "Ler e estudar" },
  { to: "/rosario", label: "Rosário", desc: "Rezar e meditar" },
  { to: "/sagrado-coracao", label: "Sagrado Coração", desc: "História, promessas, consagração" },
  { to: "/catecismo", label: "Catecismo", desc: "O que a Igreja crê" },
  { to: "/herois-da-fe", label: "Heróis da Fé", desc: "Santos que inspiram" },
  { to: "/herois-biblicos", label: "Heróis Bíblicos", desc: "Gente das Escrituras" },
  { to: "/audiobooks", label: "Audiobooks", desc: "Livros pra ouvir" },
  { to: "/livros", label: "Livros", desc: "Biblioteca em PDF" },
  { to: "/lumine", label: "Lumine", desc: "Cinema católico" },
  { to: "/quiz", label: "Quiz católico", desc: "Aprender jogando" },
  { to: "/testemunhos", label: "Testemunhos", desc: "O que Deus fez" },
  { to: "/catolico-responde", label: "Católico Responde", desc: "Tirar dúvidas da fé" },
];

export function HojePage() {
  const santo = santoDoDia();
  const jovem = santoJovemDoDia();
  const devocional = pickForToday(devocionais);
  const misterios = conjuntoDoDia();

  return (
    <div className={styles.page}>
      <IntroMusica />
      <section className={styles.hero}>
        <BrandLogo width={248} className={styles.logo} />
        <h1 className={styles.saudacao}>
          Eu tenho para onde <span>voltar.</span>
        </h1>
        <p className={styles.grupo}>
          <ChurchMark size={15} />
          Missão Adonai · Igreja Católica
        </p>

        <LemaFogo />

        <p className={styles.data}>{todayLong()}</p>
      </section>

      <Link to="/evangelho" className={`${styles.card} ${styles.cardFeatured}`}>
        <p className="eyebrow">Evangelho do dia</p>
        <h2 className={styles.cardTitle}>A leitura de hoje na liturgia</h2>
        <p className={styles.cardText}>
          O Evangelho proclamado hoje na Santa Missa, com a antífona e a oração do dia.
        </p>
        <span className={styles.cta}>Abrir a Palavra →</span>
      </Link>

      <Link to="/rosario/rezar" className={styles.card}>
        <p className="eyebrow">Rosário de hoje · {misterios.nome}</p>
        <h3 className={styles.miniTitle}>{misterios.resumo}</h3>
        <span className={styles.cta}>Rezar agora →</span>
      </Link>

      <div className={styles.pair}>
        <Link to={`/santos/${santo.slug}`} className={styles.card}>
          <p className="eyebrow">Santo do dia</p>
          <h3 className={styles.miniTitle}>{santo.nome}</h3>
          <p className={styles.miniText}>{santo.titulo}</p>
        </Link>

        <Link to={`/santos/${jovem.slug}`} className={styles.card}>
          <p className="eyebrow">Jovem de referência</p>
          <h3 className={styles.miniTitle}>{jovem.nome}</h3>
          <p className={styles.miniText}>{jovem.periodo}</p>
        </Link>
      </div>

      <Link to="/devocionais" className={styles.card}>
        <p className="eyebrow">Devocional de hoje · {devocional.tema}</p>
        <h3 className={styles.miniTitle}>{devocional.titulo}</h3>
        <p className={styles.devText}>{devocional.texto[0]}</p>
        <span className={styles.cta}>Ler e rezar →</span>
      </Link>

      <section>
        <h2 className={styles.secTitle}>Explorar a fé</h2>
        <div className={styles.grid}>
          {atalhos.map((a) => (
            <Link key={a.to} to={a.to} className={styles.tile}>
              <span className={styles.tileLabel}>{a.label}</span>
              <span className={styles.tileDesc}>{a.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <Link to="/comunidade/desperta" className={styles.destaque}>
        <img src={capaDesperta.src} alt="Desperta, 8ª edição" className={styles.destaqueImg} />
        <div className={styles.destaqueTexto}>
          <p className="eyebrow">Missão Adonai · Desperta</p>
          <h3 className={styles.destaqueTitulo}>Fotos do Desperta</h3>
          <p className={styles.miniText}>{fotosDesperta.length} fotos do retiro. Toque para ver o álbum →</p>
        </div>
      </Link>

      <Link to="/comunidade" className={`${styles.card} ${styles.cardGroup} ${styles.cardGrande}`}>
        <p className="eyebrow">Missão Adonai</p>
        <h3 className={styles.destaqueTitulo}>Pregações</h3>
        <p className={styles.miniText}>As pregações dos encontros e dos pregadores convidados.</p>
        <span className={styles.cta}>Ouvir pregações →</span>
      </Link>

      <div className={styles.pair}>
        <a href="https://instagram.com/go.adonai" target="_blank" rel="noopener noreferrer" className={styles.card}>
          <p className="eyebrow">Instagram</p>
          <h3 className={styles.miniTitle}>@go.adonai</h3>
        </a>
        <Link to="/comunidade/musicas" className={styles.card}>
          <p className="eyebrow">Spotify</p>
          <h3 className={styles.miniTitle}>Louvor católico</h3>
        </Link>
      </div>

      <Link to="/ajude" className={`${styles.card} ${styles.cardHelp}`}>
        <p className="eyebrow">Ajude-nos</p>
        <h3 className={styles.miniTitle}>Qualquer ajuda é bem-vinda</h3>
        <p className={styles.miniText}>
          Sua oferta mantém os encontros, o retiro Desperta e as missões de pé.
        </p>
      </Link>
    </div>
  );
}
