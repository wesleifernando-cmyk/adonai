import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { PageHeader } from "../../components/ui/PageHeader";
import { CODIGO_PIX } from "../../content/pix";
import styles from "./AjudePage.module.css";

export function AjudePage() {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(CODIGO_PIX, { width: 400, margin: 1 })
      .then(setQrUrl)
      .catch(() => setQrUrl(null));
  }, []);

  async function copiarChave() {
    try {
      await navigator.clipboard.writeText(CODIGO_PIX);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // navegador sem permissão de clipboard — a pessoa ainda pode selecionar o texto na mão
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Ajude-nos"
        title="Qualquer ajuda é bem-vinda"
        lead="A Missão Adonai se mantém com a generosidade de quem caminha junto. Sua oferta ajuda a sustentar os encontros, o retiro Desperta e as missões."
      />

      <div className={styles.pix}>
        {qrUrl ? (
          <img src={qrUrl} alt="QR code Pix da Missão Adonai" className={styles.qr} />
        ) : (
          <div className={styles.qrSlot} aria-hidden="true">
            <span>Gerando QR…</span>
          </div>
        )}

        <div className={styles.pixInfo}>
          <p className="eyebrow">Pix da Missão Adonai</p>
          <p className={styles.pixText}>Escaneie o QR code acima ou copie a chave Pix abaixo.</p>
        </div>

        <button className={styles.copiar} onClick={copiarChave}>
          {copiado ? "✓ Copiado!" : "Copiar chave Pix"}
        </button>
        <p className={styles.chaveTexto}>{CODIGO_PIX}</p>
      </div>

      <p className={styles.nota}>
        Toda oferta é livre e voluntária. A Missão Adonai não cobra nada pelo conteúdo do app.
      </p>
    </div>
  );
}
