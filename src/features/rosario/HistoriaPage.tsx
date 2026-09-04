import { PageHeader } from "../../components/ui/PageHeader";
import { historiaRosario } from "../../content/rosario/historia";
import styles from "./Rosario.module.css";

export function HistoriaRosarioPage() {
  return (
    <div>
      <PageHeader eyebrow={historiaRosario.eyebrow} title={historiaRosario.titulo} />

      <div className={styles.historia}>
        {historiaRosario.paragrafos.map((p) => (
          <section key={p.titulo} className={styles.historiaBloco}>
            <h2 className={styles.historiaTitulo}>{p.titulo}</h2>
            <p className={`reading ${styles.historiaTexto}`}>{p.texto}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
