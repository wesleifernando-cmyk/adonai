import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ApiError, apiFetch, guardarToken, limparToken, pegarToken } from "../api";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  admin?: boolean;
  foto_url?: string | null;
  idade?: number | null;
  telefone?: string | null;
};

export type Acesso = {
  ativo: boolean;
  tipo: "cartao" | "avulso" | "sem_vencimento" | null;
  /** vencimento do acesso avulso (ISO) */
  ate: string | null;
  diasRestantes: number | null;
  /** quando o último acesso avulso venceu, se já venceu */
  venceuEm: string | null;
};

type AuthState = {
  usuario: Usuario | null;
  assinaturaAtiva: boolean;
  acesso: Acesso | null;
  isAdmin: boolean;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (nome: string, email: string, senha: string, telefone: string) => Promise<void>;
  entrarComFacebook: (code: string) => Promise<void>;
  sair: () => void;
  recarregar: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [acesso, setAcesso] = useState<Acesso | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function recarregar() {
    if (!pegarToken()) {
      setUsuario(null);
      setAssinaturaAtiva(false);
      setAcesso(null);
      setCarregando(false);
      return;
    }
    try {
      let dados: { usuario: Usuario; assinaturaAtiva: boolean; acesso?: Acesso };
      try {
        dados = await apiFetch("/auth/eu");
      } catch (err) {
        // Servidor fora do ar por um instante (rede ou erro 5xx): tenta mais uma vez
        // antes de desistir, pra não deslogar ninguém à toa.
        if (err instanceof ApiError && err.status >= 400 && err.status < 500) throw err;
        await new Promise((r) => setTimeout(r, 2000));
        dados = await apiFetch("/auth/eu");
      }
      setUsuario(dados.usuario);
      setAssinaturaAtiva(dados.assinaturaAtiva);
      setAcesso(dados.acesso ?? null);
    } catch (err) {
      // Só apaga a sessão quando o servidor realmente recusa (token inválido,
      // conta bloqueada). Falha de rede/servidor mantém o login guardado.
      if (err instanceof ApiError && err.status >= 400 && err.status < 500) limparToken();
      setUsuario(null);
      setAssinaturaAtiva(false);
      setAcesso(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function entrar(email: string, senha: string) {
    const dados = await apiFetch<{ token: string; usuario: Usuario }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    });
    guardarToken(dados.token);
    setUsuario(dados.usuario);
    await recarregar();
  }

  async function cadastrar(nome: string, email: string, senha: string, telefone: string) {
    const dados = await apiFetch<{ token: string; usuario: Usuario }>("/auth/cadastro", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha, telefone }),
    });
    guardarToken(dados.token);
    setUsuario(dados.usuario);
    await recarregar();
  }

  async function entrarComFacebook(code: string) {
    const dados = await apiFetch<{ token: string; usuario: Usuario }>("/auth/facebook/callback", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    guardarToken(dados.token);
    setUsuario(dados.usuario);
    await recarregar();
  }

  function sair() {
    limparToken();
    setUsuario(null);
    setAssinaturaAtiva(false);
    setAcesso(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        assinaturaAtiva,
        acesso,
        isAdmin: Boolean(usuario?.admin),
        carregando,
        entrar,
        cadastrar,
        entrarComFacebook,
        sair,
        recarregar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de um <AuthProvider>.");
  return ctx;
}
