import { PageHeader } from "../../components/ui/PageHeader";
import styles from "./AjudePage.module.css";

export function AjudePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ajude-nos"
        title="Qualquer ajuda é bem-vinda"
        lead="A Missão Adonai se mantém com a generosidade de quem caminha junto. Sua oferta ajuda a sustentar os encontros, o retiro Desperta e as missões."
      />

      <div className={styles.pix}>
        <div className={styles.qrSlot} aria-hidden="true">
          <span>QR do Pix</span>
          <small>em breve</small>
        </div>
        <div className={styles.pixInfo}>
          <p className="eyebrow">Pix da Missão Adonai</p>
          <p className={styles.pixText}>
            O QR code e a chave Pix entram aqui assim que a equipe enviar. Você poderá escanear
            direto pelo celular ou copiar a chave.
          </p>
        </div>
      </div>

      <p className={styles.nota}>
        Toda oferta é livre e voluntária. A Missão Adonai não cobra nada pelo conteúdo do app.
      </p>
    </div>
  );
}
