import { Link } from "react-router-dom";
import { BrandMark } from "../ui/Brand";
import { todayLong } from "../../lib/dates";
import { useAuth } from "../../lib/auth/AuthContext";
import styles from "./TopBar.module.css";

function ContaIndicador() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <Link to="/entrar" className={styles.conta} aria-label="Entrar na sua conta">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </Link>
    );
  }

  const inicial = usuario.nome.trim().charAt(0).toUpperCase();

  return (
    <Link to="/perfil" className={styles.conta} aria-label={`Logado como ${usuario.nome}`}>
      {usuario.foto_url ? (
        <img src={usuario.foto_url} alt="" className={styles.foto} />
      ) : (
        <span className={styles.inicial}>{inicial}</span>
      )}
    </Link>
  );
}

export function TopBar() {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Adonai — início">
          <BrandMark size={30} />
          <span className={styles.word}>ADONAI</span>
        </Link>
        <div className={styles.direita}>
          <time className={styles.date} dateTime={new Date().toISOString().slice(0, 10)}>
            {todayLong()}
          </time>
          <ContaIndicador />
        </div>
      </div>
    </header>
  );
}
