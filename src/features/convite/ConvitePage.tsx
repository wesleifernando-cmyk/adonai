import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import { mascaraTelefone, telefoneValido } from "../../lib/telefone";
import styles from "./Convite.module.css";

export type InfoEvento = {
  nome: string;
  data: string;
  local: string;
  descricao: string;
  precoCentavos: number;
  maxPorPedido: number;
  esgotado: boolean;
};

export const reais = (centavos: number) => `R$ ${(centavos / 100).toFixed(2).replace(".", ",")}`;

const CHAVE_PEDIDO = "adonai_convite_token";

export function ConvitePage() {
  const { podeConferir } = useAuth();
  const [info, setInfo] = useState<InfoEvento | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  let pedidoAnterior: string | null = null;
  try {
    pedidoAnterior = localStorage.getItem(CHAVE_PEDIDO);
  } catch {
    /* sem armazenamento */
  }

  useEffect(() => {
    apiFetch<InfoEvento>("/convites/info")
      .then(setInfo)
      .catch((e) => setErro(e instanceof Error ? e.message : "Erro ao carregar o evento."));
  }, []);

  async function pagar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (nome.trim().length < 3) return setErro("Informe seu nome completo.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErro("Informe um e-mail válido.");
    if (!telefoneValido(telefone)) return setErro("Informe seu WhatsApp com DDD, por exemplo: (11) 91234-5678.");
    setEnviando(true);
    try {
      const r = await apiFetch<{ initPoint: string; token: string }>("/convites/checkout", {
        method: "POST",
        body: JSON.stringify({ nome, email, telefone, quantidade }),
      });
      try {
        localStorage.setItem(CHAVE_PEDIDO, r.token);
      } catch {
        /* sem armazenamento */
      }
      window.location.href = r.initPoint;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setEnviando(false);
    }
  }

  const max = info?.maxPorPedido ?? 1;
  const total = (info?.precoCentavos ?? 0) * quantidade;

  return (
    <div>
      <PageHeader eyebrow="Convite" title="Garanta o seu lugar" lead="Pague e receba o QR Code do convite no e-mail e na tela." />

      {podeConferir && (
        <Link to="/convite/conferir" className={styles.conferir}>
          📷 Conferir ingresso (portaria)
        </Link>
      )}

      <img
        src="/evento/que-nasca-em-nos.jpg"
        alt="Que Nasça em Nós, Luau Especial de Natal. Save the date: 20 de dezembro."
        className={styles.arte}
      />

      {info && (
        <div className={styles.evento}>
          <p className="eyebrow">Evento</p>
          <h2 className={styles.eventoNome}>{info.nome}</h2>
          <p className={styles.eventoLinha}>📅 {info.data}</p>
          <p className={styles.eventoLinha}>📍 {info.local}</p>
          {info.descricao && <p className={styles.eventoDesc}>{info.descricao}</p>}
        </div>
      )}

      {pedidoAnterior && (
        <Link to={`/convite/${pedidoAnterior}`} className={styles.secundario} style={{ marginTop: 0, marginBottom: 16 }}>
          Já comprei: ver meu convite
        </Link>
      )}

      {info?.esgotado ? (
        <p className={styles.aviso}>Os convites acabaram. Obrigado pelo carinho!</p>
      ) : (
        <form onSubmit={pagar}>
          {erro && <p className={styles.erro}>{erro}</p>}
          <div className={styles.campo}>
            <label htmlFor="c-nome">Nome completo</label>
            <input id="c-nome" required autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor="c-email">E-mail (o convite chega aqui)</label>
            <input
              id="c-email"
              type="email"
              required
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.campo}>
            <label htmlFor="c-tel">WhatsApp</label>
            <input
              id="c-tel"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              value={telefone}
              onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
            />
          </div>

          <div className={styles.campo}>
            <label>Quantos convites?</label>
            <div className={styles.qtd}>
              <button type="button" className={styles.qtdBotao} disabled={quantidade <= 1} onClick={() => setQuantidade(quantidade - 1)} aria-label="Menos um">
                −
              </button>
              <span className={styles.qtdNum}>{quantidade}</span>
              <button type="button" className={styles.qtdBotao} disabled={quantidade >= max} onClick={() => setQuantidade(quantidade + 1)} aria-label="Mais um">
                +
              </button>
            </div>
          </div>

          <div className={styles.total}>
            <span>Total</span>
            <span className={styles.totalValor}>{reais(total)}</span>
          </div>

          <button className={styles.enviar} type="submit" disabled={enviando || !info}>
            {enviando ? "Abrindo pagamento…" : "Pagar com Pix, crédito ou débito"}
          </button>
          <p className={styles.nota}>
            O pagamento é feito no Mercado Pago. Assim que for aprovado, o QR Code aparece na tela e chega no seu e-mail.
            Cada QR Code vale uma única entrada.
          </p>
        </form>
      )}
    </div>
  );
}
