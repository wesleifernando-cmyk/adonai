import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";
import { apiFetch } from "../../lib/api";
import styles from "./AssinarPage.module.css";

export function AssinarPage() {
  const { usuario, assinaturaAtiva, recarregar } = useAuth();
  const location = useLocation();
  const destino = (location.state as { de?: string } | null)?.de || "/";

  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [verificando, setVerificando] = useState(false);

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
        body: JSON.stringify({ email: usuario!.email }),
      });
      window.location.href = dados.initPoint;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setCarregando(false);
    }
  }

  async function jaPaguei() {
    setVerificando(true);
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
      <div className={styles.card}>
        {erro && <p className={styles.erro}>{erro}</p>}
        <p className={styles.preco}>R$ 9,90</p>
        <button className={styles.botao} onClick={assinar} disabled={carregando}>
          {carregando ? "Abrindo pagamento…" : "Assinar agora"}
        </button>
        <button className={styles.secundario} onClick={jaPaguei} disabled={verificando}>
          {verificando ? "Verificando…" : "Já paguei, verificar"}
        </button>
      </div>
    </div>
  );
}
