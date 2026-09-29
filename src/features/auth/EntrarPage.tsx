import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";
import styles from "./AuthForm.module.css";

export function EntrarPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = (location.state as { de?: string } | null)?.de || "/";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await entrar(email, senha);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Sua conta" title="Entrar" lead="Entre para acessar o conteúdo completo da Missão Adonai." />
      <form onSubmit={aoEnviar}>
        {erro && <p className={styles.erro}>{erro}</p>}
        <div className={styles.campo}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button className={styles.enviar} type="submit" disabled={enviando}>
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
      <p className={styles.rodape}>
        Ainda não tem conta? <Link to="/cadastro" state={{ de: destino }}>Criar conta</Link>
      </p>
    </div>
  );
}
