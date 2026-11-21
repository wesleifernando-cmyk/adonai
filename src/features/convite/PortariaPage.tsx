import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import jsQR from "jsqr";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import { linkWhatsApp, mascaraTelefone, telefoneBonito } from "../../lib/telefone";
import styles from "./Portaria.module.css";

type Resultado =
  | { resultado: "liberado"; nome: string; usadoEm: string; pedidoQuantidade: number }
  | { resultado: "ja_usado"; nome: string; usadoEm: string; usadoPor: string | null }
  | { resultado: "cancelado"; nome: string }
  | { resultado: "invalido" }
  | { resultado: "erro"; mensagem: string };

type Linha = {
  id: number;
  codigo: string;
  nome: string;
  status: "valido" | "cancelado";
  usado_em: string | null;
  usado_por: string | null;
  email: string;
  telefone: string | null;
  origem: string;
  token: string;
};
type Painel = { vendidos: number; entraram: number; pendentes: number; cancelados: number; lista: Linha[] };

const hora = (iso: string) => new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const dataHora = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export function PortariaPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const travado = useRef(false);
  // Mesmo QR continua na frente da câmera por alguns segundos: não conta como nova leitura.
  const ultimoLido = useRef({ codigo: "", t: 0 });
  const buscaRef = useRef("");

  const [camera, setCamera] = useState<"parada" | "abrindo" | "ativa">("parada");
  const [erroCamera, setErroCamera] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [painel, setPainel] = useState<Painel | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  buscaRef.current = busca;
  const [manual, setManual] = useState("");
  const { isAdmin } = useAuth();
  const [emitido, setEmitido] = useState<string | null>(null);

  const carregarPainel = useCallback(async (q = "") => {
    try {
      setPainel(await apiFetch<Painel>(`/convites/painel?q=${encodeURIComponent(q)}`));
      setErro(null);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar a lista.");
    }
  }, []);

  // Busca com pequena espera, e atualização automática dos números.
  useEffect(() => {
    const t = window.setTimeout(() => carregarPainel(busca), 300);
    return () => window.clearTimeout(t);
  }, [busca, carregarPainel]);
  useEffect(() => {
    const i = window.setInterval(() => carregarPainel(busca), 15000);
    return () => window.clearInterval(i);
  }, [busca, carregarPainel]);

  const validar = useCallback(
    async (codigo: string) => {
      travado.current = true;
      ultimoLido.current = { codigo, t: Date.now() };
      try {
        const r = await apiFetch<Resultado>("/convites/validar", { method: "POST", body: JSON.stringify({ codigo }) });
        setResultado(r);
        try {
          navigator.vibrate?.(r.resultado === "liberado" ? 120 : [200, 100, 200]);
        } catch {
          /* sem vibração */
        }
        carregarPainel(buscaRef.current);
      } catch (e) {
        setResultado({ resultado: "erro", mensagem: e instanceof Error ? e.message : "Sem conexão. Tente de novo." });
      }
    },
    [carregarPainel]
  );

  function proximo() {
    setResultado(null);
    ultimoLido.current.t = Date.now();
    travado.current = false;
  }

  // Convite liberado some sozinho depois de 2,5 s, para a fila andar.
  useEffect(() => {
    if (resultado?.resultado !== "liberado") return;
    const t = window.setTimeout(proximo, 2500);
    return () => window.clearTimeout(t);
  }, [resultado]);

  function fecharCamera() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamera("parada");
  }
  useEffect(() => fecharCamera, []);

  async function abrirCamera() {
    setErroCamera(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setErroCamera("Este navegador não libera a câmera aqui. Abra o Adonai pelo Safari ou Chrome.");
      return;
    }
    setCamera("abrindo");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      video.setAttribute("playsinline", "true");
      await video.play();
      travado.current = false;
      setCamera("ativa");

      let ultimoQuadro = 0;
      const passo = (agora: number) => {
        rafRef.current = requestAnimationFrame(passo);
        if (travado.current || agora - ultimoQuadro < 120) return;
        ultimoQuadro = agora;
        const v = videoRef.current;
        const c = canvasRef.current;
        if (!v || !c || !v.videoWidth) return;
        const escala = Math.min(1, 720 / v.videoWidth);
        c.width = Math.round(v.videoWidth * escala);
        c.height = Math.round(v.videoHeight * escala);
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(v, 0, 0, c.width, c.height);
        const quadro = ctx.getImageData(0, 0, c.width, c.height);
        const achado = jsQR(quadro.data, quadro.width, quadro.height, { inversionAttempts: "dontInvert" });
        if (achado?.data) {
          const repetido = achado.data === ultimoLido.current.codigo && Date.now() - ultimoLido.current.t < 6000;
          if (!repetido) validar(achado.data);
        }
      };
      rafRef.current = requestAnimationFrame(passo);
    } catch {
      setCamera("parada");
      setErroCamera("Não consegui abrir a câmera. Permita o acesso à câmera para o Adonai nas configurações do navegador e tente de novo.");
    }
  }

  async function emitir(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const r = await apiFetch<{ link: string }>("/convites/emitir", {
        method: "POST",
        body: JSON.stringify({
          nome: f.get("nome"),
          email: f.get("email"),
          telefone: f.get("telefone"),
          quantidade: Number(f.get("quantidade") || 1),
        }),
      });
      setEmitido(r.link);
      e.currentTarget.reset();
      carregarPainel(buscaRef.current);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao emitir o convite.");
    }
  }

  const faltam = painel ? painel.vendidos - painel.entraram : 0;

  return (
    <div>
      <Link to="/convite">← Convite do evento</Link>
      <div style={{ marginTop: 12 }}>
        <PageHeader eyebrow="Portaria" title="Ler convites" lead="Aponte a câmera para o QR Code. Cada convite só entra uma vez." />
      </div>

      <div className={styles.resumo}>
        <div className={styles.stat}>
          <p className={styles.statNum}>{painel?.vendidos ?? "–"}</p>
          <p className={styles.statLabel}>Vendidos</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNum}>{painel?.entraram ?? "–"}</p>
          <p className={styles.statLabel}>Entraram</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNum}>{painel ? faltam : "–"}</p>
          <p className={styles.statLabel}>Faltam</p>
        </div>
      </div>

      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.palco}>
        <video ref={videoRef} className={styles.video} muted playsInline />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {camera === "ativa" && !resultado && <div className={styles.mira} />}

        {camera !== "ativa" && (
          <div className={styles.vazio}>
            <p>{camera === "abrindo" ? "Abrindo a câmera…" : "A câmera está desligada."}</p>
            <button className={`${styles.botao} ${styles.botaoFogo}`} onClick={abrirCamera} disabled={camera === "abrindo"}>
              Abrir câmera e ler convite
            </button>
            {erroCamera && <p className={styles.erro}>{erroCamera}</p>}
          </div>
        )}

        {resultado && (
          <div
            className={`${styles.resultado} ${
              resultado.resultado === "liberado" ? styles.resOk : resultado.resultado === "cancelado" ? styles.resAviso : styles.resRuim
            }`}
            role="alert"
          >
            <span className={styles.resIcone}>{resultado.resultado === "liberado" ? "✓" : "✕"}</span>
            {resultado.resultado === "liberado" && (
              <>
                <h2 className={styles.resTitulo}>Entrada liberada</h2>
                <p className={styles.resNome}>{resultado.nome}</p>
                <p className={styles.resDetalhe}>Pago e válido · lido às {hora(resultado.usadoEm)}</p>
              </>
            )}
            {resultado.resultado === "ja_usado" && (
              <>
                <h2 className={styles.resTitulo}>Já utilizado</h2>
                <p className={styles.resNome}>{resultado.nome}</p>
                <p className={styles.resDetalhe}>
                  Entrou em {dataHora(resultado.usadoEm)}
                  {resultado.usadoPor ? ` (lido por ${resultado.usadoPor})` : ""}
                </p>
              </>
            )}
            {resultado.resultado === "cancelado" && (
              <>
                <h2 className={styles.resTitulo}>Convite cancelado</h2>
                <p className={styles.resNome}>{resultado.nome}</p>
                <p className={styles.resDetalhe}>O pagamento foi devolvido.</p>
              </>
            )}
            {resultado.resultado === "invalido" && (
              <>
                <h2 className={styles.resTitulo}>QR Code inválido</h2>
                <p className={styles.resDetalhe}>Este código não existe ou não foi pago.</p>
              </>
            )}
            {resultado.resultado === "erro" && (
              <>
                <h2 className={styles.resTitulo}>Não deu para conferir</h2>
                <p className={styles.resDetalhe}>{resultado.mensagem}</p>
              </>
            )}
            <button className={styles.resBotao} onClick={proximo}>
              Ler próximo
            </button>
          </div>
        )}
      </div>

      {camera === "ativa" && (
        <button className={styles.botao} style={{ width: "100%", marginBottom: 12 }} onClick={fecharCamera}>
          Desligar câmera
        </button>
      )}

      <form
        className={styles.manual}
        onSubmit={(e) => {
          e.preventDefault();
          if (manual.trim()) {
            validar(manual.trim());
            setManual("");
          }
        }}
      >
        <input
          className={styles.input}
          placeholder="Ou digite o código do convite"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          autoCapitalize="characters"
          autoCorrect="off"
        />
        <button className={styles.botao} type="submit">
          Validar
        </button>
      </form>

      <h2 className={styles.secao}>Convidados</h2>
      <input
        type="search"
        className={styles.input}
        style={{ width: "100%", marginBottom: 12 }}
        placeholder="Buscar por nome, e-mail, telefone ou código…"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      {painel?.lista.length === 0 && <p className={styles.sub}>Ninguém encontrado.</p>}
      {painel?.lista.map((c) => (
        <div key={c.id} className={styles.linha}>
          <div className={styles.linhaTopo}>
            <div>
              <p className={styles.nome}>{c.nome}</p>
              <p className={styles.sub}>
                {c.email || "sem e-mail"}
                {c.telefone ? ` · ${telefoneBonito(c.telefone)}` : ""}
                {c.origem === "manual" ? " · emitido manualmente" : ""}
              </p>
            </div>
            <span
              className={`${styles.chip} ${
                c.status === "cancelado" ? styles.chipRuim : c.usado_em ? styles.chipEntrou : styles.chipOk
              }`}
            >
              {c.status === "cancelado" ? "cancelado" : c.usado_em ? `entrou ${hora(c.usado_em)}` : "pago · não entrou"}
            </span>
          </div>
          <div className={styles.linhaAcoes}>
            {c.status === "valido" && !c.usado_em && (
              <button
                className={`${styles.botao} ${styles.botaoPeq}`}
                onClick={() => {
                  if (window.confirm(`Liberar a entrada de ${c.nome} agora?`)) validar(c.codigo);
                }}
              >
                Liberar entrada sem QR
              </button>
            )}
            {c.telefone && (
              <a className={styles.whats} href={linkWhatsApp(c.telefone)} target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
            )}
            <a className={styles.whats} style={{ color: "var(--ember)" }} href={`/convite/${c.token}`} target="_blank" rel="noopener noreferrer">
              Ver convite
            </a>
          </div>
        </div>
      ))}

      {isAdmin && (
      <details className={styles.caixa}>
        <summary>Emitir convite sem pagamento (cortesia ou Pix direto)</summary>
        <form onSubmit={emitir}>
          <input className={styles.input} name="nome" placeholder="Nome" required />
          <input className={styles.input} name="email" type="email" placeholder="E-mail (opcional, para enviar o convite)" />
          <input
            className={styles.input}
            name="telefone"
            type="tel"
            placeholder="WhatsApp (opcional)"
            onChange={(e) => (e.target.value = mascaraTelefone(e.target.value))}
          />
          <input className={styles.input} name="quantidade" type="number" min={1} max={20} defaultValue={1} />
          <button className={`${styles.botao} ${styles.botaoFogo}`} type="submit">
            Emitir convite
          </button>
        </form>
        {emitido && (
          <p className={styles.sub} style={{ marginTop: 10 }}>
            Convite criado. Link para mandar à pessoa: <span className={styles.link}>{emitido}</span>
          </p>
        )}
      </details>
      )}
    </div>
  );
}
