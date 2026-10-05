import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";
import { apiFetch } from "../../lib/api";
import { dataCurta } from "../../lib/dates";
import styles from "./AssinarPage.module.css";

export function AssinarPage() {
  const { usuario, assinaturaAtiva, acesso, recarregar } = useAuth();
  const location = useLocation();
  const destino = (location.state as { de?: string } | null)?.de || "/";

  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const retorno = new URLSearchParams(location.search).get("retorno");

  // Voltou do Mercado Pago: confere na hora se o pagamento já caiu.
  useEffect(() => {
    if (!retorno) return;
    (async () => {
      try {
        await apiFetch("/pagamentos/verificar", { method: "POST" });
      } catch {
        /* segue com o que já tiver */
      }
      await recarregar();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retorno]);

  if (!usuario) {
    return <Navigate to="/entrar" state={{ de: "/assinar" }} replace />;
  }
  if (assinaturaAtiva) {
    return <Navigate to={destino} replace />;
  }

  async function assinar() {
    setErro(null);
    setCarregando(true);
    try {
      const dados = await apiFetch<{ initPoint: string }>("/pagamentos/checkout", {
        method: "POST",
      });
      window.location.href = dados.initPoint;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setCarregando(false);
    }
  }

  async function pagarAvulso() {
    setErro(null);
    setCarregando(true);
    try {
      const dados = await apiFetch<{ initPoint: string }>("/pagamentos/checkout-avulso", {
        method: "POST",
      });
      window.location.href = dados.initPoint;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setCarregando(false);
    }
  }

  async function jaPaguei() {
    setVerificando(true);
    try {
      await apiFetch("/pagamentos/verificar", { method: "POST" });
    } catch {
      // se falhar a consulta ativa, ainda tenta recarregar com o que já tiver salvo
    }
    await recarregar();
    setVerificando(false);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Assinatura"
        title="Acesso completo à Missão Adonai"
        lead="Bíblia, Catecismo, audiobooks, livros, quiz, Lumine, Sagrado Coração, Rosário e as pregações da comunidade — tudo liberado com a assinatura."
      />
      {acesso?.venceuEm && (
        <p className={styles.aviso}>
          Seu acesso venceu em {dataCurta(acesso.venceuEm)}. Renove abaixo para voltar a usar tudo.
        </p>
      )}
      {retorno === "pendente" && (
        <p className={styles.aviso}>
          Pagamento ainda em análise. Quando o Pix cair, toque em "Já paguei, verificar".
        </p>
      )}
      {retorno === "falhou" && <p className={styles.erro}>O pagamento não foi concluído. Tente de novo.</p>}

      <p className={styles.preco}>
        R$ 5,99<span className={styles.precoPeriodo}>/mês</span>
      </p>

      <div className={styles.card}>
        {erro && <p className={styles.erro}>{erro}</p>}
        <p className={styles.opcaoTitulo}>Pix, crédito ou débito</p>
        <p className={styles.opcaoTexto}>Paga uma vez e libera 30 dias. Passou o prazo, é só pagar de novo.</p>
        <button className={styles.botao} onClick={pagarAvulso} disabled={carregando}>
          {carregando ? "Abrindo pagamento…" : "Pagar R$ 5,99 · 30 dias"}
        </button>
      </div>

      <div className={styles.card} style={{ marginTop: 12 }}>
        <p className={styles.opcaoTitulo}>Assinatura no cartão de crédito</p>
        <p className={styles.opcaoTexto}>Renova sozinha todo mês. Cancele quando quiser, direto no Mercado Pago.</p>
        <button className={styles.secundarioForte} onClick={assinar} disabled={carregando}>
          Assinar no cartão · R$ 5,99/mês
        </button>
      </div>

      <button className={styles.secundario} onClick={jaPaguei} disabled={verificando} style={{ marginTop: 16 }}>
        {verificando ? "Verificando…" : "Já paguei, verificar"}
      </button>
      <p className={styles.nota}>
        Pagou o Pix direto para a administração? Mande o comprovante com o seu e-mail de cadastro que o acesso é liberado.
      </p>
    </div>
  );
}
