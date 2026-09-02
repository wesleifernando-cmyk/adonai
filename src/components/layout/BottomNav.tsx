import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";

type Item = { to: string; label: string; icon: JSX.Element; end?: boolean };

const items: Item[] = [
  {
    to: "/",
    label: "Hoje",
    end: true,
    icon: (
      <path d="M4 11.5 12 4l8 7.5M6 10v9h12v-9M10 19v-5h4v5" />
    )
  },
  {
    to: "/biblia",
    label: "Bíblia",
    icon: <path d="M6 4h11a2 2 0 0 1 2 2v13H8a2 2 0 0 1-2-2V4Zm0 0v13M12 8v6M9.5 11h5" />
  },
  {
    to: "/santos",
    label: "Santos",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M12 4.5V2M6.5 18c1-3 3-4.5 5.5-4.5S16.5 15 17.5 18M9 21h6" />
      </>
    )
  },
  {
    to: "/quiz",
    label: "Quiz",
    icon: <path d="M9.2 9a2.8 2.8 0 1 1 4 2.5c-.9.5-1.7 1.2-1.7 2.5M12 17.5v.01M4 5h16v12H13l-4 3v-3H4z" />
  },
  {
    to: "/mais",
    label: "Mais",
    icon: <><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></>
  }
];

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.end}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {it.icon}
          </svg>
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
