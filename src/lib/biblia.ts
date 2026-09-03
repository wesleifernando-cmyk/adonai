export type LivroTexto = {
  nome: string;
  /** capitulos[i] = array de versículos (índice 0 = versículo 1) */
  capitulos: string[][];
};

/** Livros do cânon católico ainda sem texto livre (deuterocanônicos).
 *  A Tradução Brasileira, de domínio público, não os inclui. */
export const SEM_TEXTO = new Set([
  "tobias",
  "judite",
  "1-macabeus",
  "2-macabeus",
  "sabedoria",
  "eclesiastico",
  "baruc",
]);

export const TRADUCAO_ATUAL = {
  sigla: "TB",
  nome: "Tradução Brasileira",
  nota: "Edição de domínio público (Sociedade Bíblica do Brasil). Versão provisória — a Missão Adonai ainda vai revisar e completar os livros deuterocanônicos.",
};

const cache = new Map<string, LivroTexto>();

export async function carregarLivro(slug: string): Promise<LivroTexto | null> {
  if (SEM_TEXTO.has(slug)) return null;
  const emCache = cache.get(slug);
  if (emCache) return emCache;
  try {
    const res = await fetch(`/biblia/tb/${slug}.json`);
    if (!res.ok) return null;
    const data = (await res.json()) as LivroTexto;
    cache.set(slug, data);
    return data;
  } catch {
    return null;
  }
}
