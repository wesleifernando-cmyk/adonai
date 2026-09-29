import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";
import styles from "./AuthForm.module.css";

export function CadastroPage() {
  const { cadastrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = (location.state as { de?: string } | null)?.de || "/assinar";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await cadastrar(nome, email, senha);
      navigate("/assinar", { state: { de: destino }, replace: true });
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Sua conta" title="Criar conta" lead="Crie sua conta pra acessar Bíblia, Catecismo, audiobooks, quiz e muito mais." />
      <form onSubmit={aoEnviar}>
        {erro && <p className={styles.erro}>{erro}</p>}
        <div className={styles.campo}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            required
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button className={styles.enviar} type="submit" disabled={enviando}>
          {enviando ? "Criando…" : "Criar conta"}
        </button>
      </form>
      <p className={styles.rodape}>
        Já tem conta? <Link to="/entrar" state={{ de: destino }}>Entrar</Link>
      </p>
    </div>
  );
}
