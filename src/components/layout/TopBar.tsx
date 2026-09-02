import { Link } from "react-router-dom";
import { FireMark } from "../ui/FireMark";
import { todayLong } from "../../lib/dates";
import styles from "./TopBar.module.css";

export function TopBar() {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Adonai — início">
          <FireMark size={26} />
          <span className={styles.word}>ADONAI</span>
        </Link>
        <time className={styles.date} dateTime={new Date().toISOString().slice(0, 10)}>
          {todayLong()}
        </time>
      </div>
    </header>
  );
}
