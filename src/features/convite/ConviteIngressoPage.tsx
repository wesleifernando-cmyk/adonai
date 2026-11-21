import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { reais } from "./ConvitePage";
import styles from "./Convite.module.css";

type Convite = { codigo: string; nome: string; status: "valido" | "cancelado"; usado: boolean };
type Pedido = {
  status: "pendente" | "pago" | "estornado";
  nome: string;
  quantidade: number;
  valorCentavos: number;
  evento: { nome: string; data: string; local: string };
  emailEnviado: boolean;
  convites: Convite[];
};

const agrupar = (c: string) => c.match(/.{1,5}/g)?.join("-") ?? c;

function CartaoConvite({ convite }: { convite: Convite }) {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(convite.codigo, { width: 640, margin: 2, errorCorrectionLevel: "M" }).then(setImg);
  }, [convite.codigo]);

  const inativo = convite.usado || convite.status === "cancelado";
  return (
    <div className={`${styles.ingresso} ${inativo ? styles.ingressoUsado : ""}`}>
      <p className={styles.ingressoNome}>{convite.nome}</p>
      {img && <img src={img} alt={`QR Code do convite de ${convite.nome}`} className={styles.qr} />}
      <p className={styles.codigo}>{agrupar(convite.codigo)}</p>
      <span className={`${styles.selo} ${inativo ? styles.seloUsado : styles.seloOk}`}>
        {convite.status === "cancelado" ? "Cancelado" : convite.usado ? "Já utilizado" : "Válido · 1 entrada"}
      </span>
      {img && !inativo && (
        <div className={styles.acoesLinha}>
          <a className={styles.secundario} style={{ marginTop: 0 }} href={img} download={`convite-${convite.codigo.slice(0, 5)}.png`}>
            Salvar imagem
          </a>
        </div>
      )}
    </div>
  );
}

export function ConviteIngressoPage() {
  const { token } = useParams();
  const [busca] = useSearchParams();
  const retorno = busca.get("retorno");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const tentativas = useRef(0);

  useEffect(() => {
    let ativo = true;
    let timer: number | undefined;

    async function carregar() {
      try {
        const p = await apiFetch<Pedido>(`/convites/pedido/${token}`);
        if (!ativo) return;
        setPedido(p);
        setErro(null);
        // Pix pode demorar alguns instantes: continua conferindo por até ~10 minutos.
        if (p.status === "pendente" && retorno !== "falhou" && tentativas.current < 120) {
          tentativas.current += 1;
          timer = window.setTimeout(carregar, 5000);
        }
      } catch (e) {
        if (ativo) setErro(e instanceof Error ? e.message : "Erro ao carregar o convite.");
      }
    }
    carregar();
    return () => {
      ativo = false;
      window.clearTimeout(timer);
    };
  }, [token, retorno]);

  if (erro && !pedido) {
    return (
      <div>
        <PageHeader eyebrow="Convite" title="Convite não encontrado" />
        <p className={styles.erro}>{erro}</p>
        <Link to="/convite" className={styles.secundario}>Comprar convite</Link>
      </div>
    );
  }
  if (!pedido) {
    return (
      <div>
        <PageHeader eyebrow="Convite" title="Carregando…" />
      </div>
    );
  }

  const linkPagina = `${window.location.origin}/convite/${token}`;
  const textoZap = `Meu convite — ${pedido.evento.nome} (${pedido.evento.data}, ${pedido.evento.local}). Abra para ver o QR Code: ${linkPagina}`;

  return (
    <div>
      {pedido.status === "pago" && (
        <>
          <PageHeader eyebrow="Convite confirmado" title={pedido.evento.nome} lead={`${pedido.evento.data} · ${pedido.evento.local}`} />
          <p className={styles.aviso}>
            Mostre este QR Code na entrada. Cada QR Code vale <strong>uma única entrada</strong> e só é lido uma vez.
            {pedido.emailEnviado ? " Também enviamos para o seu e-mail." : ""}
          </p>
          {pedido.convites.map((c) => (
            <CartaoConvite key={c.codigo} convite={c} />
          ))}
          <a
            className={styles.enviar}
            style={{ display: "block", textAlign: "center", textDecoration: "none" }}
            href={`https://wa.me/?text=${encodeURIComponent(textoZap)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar para o meu WhatsApp
          </a>
          <p className={styles.nota}>Guarde este link: é por ele que você abre o convite de novo. Pago: {reais(pedido.valorCentavos)}.</p>
        </>
      )}

      {pedido.status === "pendente" && (
        <>
          <PageHeader eyebrow="Convite" title={retorno === "falhou" ? "Pagamento não concluído" : "Aguardando o pagamento"} />
          {retorno === "falhou" ? (
            <>
              <p className={styles.erro}>O pagamento não foi concluído. Nenhum valor foi cobrado.</p>
              <Link to="/convite" className={styles.enviar} style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                Tentar de novo
              </Link>
            </>
          ) : (
            <p className={styles.aviso}>
              Estamos esperando o Mercado Pago confirmar. Se você pagou no Pix, isso leva poucos segundos. Esta página
              atualiza sozinha e o QR Code aparece aqui. Pode deixar aberta.
            </p>
          )}
        </>
      )}

      {pedido.status === "estornado" && (
        <>
          <PageHeader eyebrow="Convite" title="Convite cancelado" />
          <p className={styles.erro}>O pagamento deste convite foi devolvido, então os QR Codes não valem mais.</p>
        </>
      )}
    </div>
  );
}
