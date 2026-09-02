import { Outlet, ScrollRestoration } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import styles from "./AppShell.module.css";

export function AppShell() {
  return (
    <div className={styles.shell}>
      <TopBar />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <BottomNav />
      <ScrollRestoration />
    </div>
  );
}
