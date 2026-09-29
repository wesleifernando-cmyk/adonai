const TOKEN_KEY = "adonai_token";

export const API_URL = import.meta.env.VITE_API_URL || "https://adonai-production-7dcf.up.railway.app";

export function pegarToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function guardarToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function limparToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const token = pegarToken();
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opcoes.headers,
    },
  });

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível falar com o servidor agora.");
  }
  return dados as T;
}
