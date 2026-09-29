import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch, guardarToken, limparToken, pegarToken } from "../api";

type Usuario = { id: number; nome: string; email: string };

type AuthState = {
  usuario: Usuario | null;
  assinaturaAtiva: boolean;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<void>;
  sair: () => void;
  recarregar: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [carregando, setCarregando] = useState(true);

  async function recarregar() {
    if (!pegarToken()) {
      setUsuario(null);
      setAssinaturaAtiva(false);
      setCarregando(false);
      return;
    }
    try {
      const dados = await apiFetch<{ usuario: Usuario; assinaturaAtiva: boolean }>("/auth/eu");
      setUsuario(dados.usuario);
      setAssinaturaAtiva(dados.assinaturaAtiva);
    } catch {
      limparToken();
      setUsuario(null);
      setAssinaturaAtiva(false);
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

  async function cadastrar(nome: string, email: string, senha: string) {
    const dados = await apiFetch<{ token: string; usuario: Usuario }>("/auth/cadastro", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha }),
    });
    guardarToken(dados.token);
    setUsuario(dados.usuario);
    await recarregar();
  }

  function sair() {
    limparToken();
    setUsuario(null);
    setAssinaturaAtiva(false);
  }

  return (
    <AuthContext.Provider value={{ usuario, assinaturaAtiva, carregando, entrar, cadastrar, sair, recarregar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de um <AuthProvider>.");
  return ctx;
}
