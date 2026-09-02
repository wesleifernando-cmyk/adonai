import { dayKey } from "../dates";

export type LeituraLiturgica = {
  referencia: string;
  titulo?: string;
  texto: string;
};

export type LiturgiaDia = {
  data: string;
  /** ex.: "3º Domingo do Tempo Comum" */
  celebracao?: string;
  cor?: string;
  primeiraLeitura?: LeituraLiturgica;
  salmo?: LeituraLiturgica;
  segundaLeitura?: LeituraLiturgica;
  evangelho?: LeituraLiturgica;
  fonte: "api" | "offline";
};

/**
 * API comunitária de Liturgia Diária (pt-BR).
 * Se estiver fora do ar ou bloqueada, caímos num texto de reserva.
 * TODO: definir fonte oficial + licença da tradução usada (ver README).
 */
const ENDPOINT = "https://liturgia.up.railway.app/v2/";

const CACHE_KEY = "adonai:liturgia";

type CacheShape = { key: string; payload: LiturgiaDia };

function readCache(key: string): LiturgiaDia | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    return parsed.key === key ? parsed.payload : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, payload: LiturgiaDia) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ key, payload } satisfies CacheShape));
  } catch {
    /* armazenamento indisponível — segue sem cache */
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapLeitura(node: any): LeituraLiturgica | undefined {
  if (!node) return undefined;
  const first = Array.isArray(node) ? node[0] : node;
  if (!first) return undefined;
  const referencia = first.referencia ?? first.ref ?? "";
  const texto = first.texto ?? first.text ?? "";
  if (!texto) return undefined;
  return { referencia, titulo: first.titulo, texto };
}

function mapResposta(raw: any, key: string): LiturgiaDia {
  const l = raw?.leituras ?? raw ?? {};
  return {
    data: key,
    celebracao: raw?.liturgia ?? raw?.celebracao ?? raw?.data,
    cor: raw?.cor,
    primeiraLeitura: mapLeitura(l.primeiraLeitura ?? l.primeira_leitura),
    salmo: mapLeitura(l.salmo),
    segundaLeitura: mapLeitura(l.segundaLeitura ?? l.segunda_leitura),
    evangelho: mapLeitura(l.evangelho),
    fonte: "api",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getLiturgiaHoje(signal?: AbortSignal): Promise<LiturgiaDia> {
  const key = dayKey();

  const cached = readCache(key);
  if (cached) return cached;

  try {
    const res = await fetch(ENDPOINT, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    const mapped = mapResposta(raw, key);
    if (mapped.evangelho?.texto) {
      writeCache(key, mapped);
      return mapped;
    }
    throw new Error("resposta sem evangelho");
  } catch {
    return LITURGIA_OFFLINE;
  }
}

/**
 * Texto de reserva — usado só quando a API não responde.
 * Fonte: "Traducção Brazileira" (1917), domínio público.
 */
export const LITURGIA_OFFLINE: LiturgiaDia = {
  data: dayKey(),
  celebracao: "Leitura de reserva (sem conexão com a liturgia do dia)",
  cor: "verde",
  evangelho: {
    referencia: "João 15,9-12",
    titulo: "Permanecei no meu amor",
    texto:
      "Como o Pai me amou, também eu vos amei; permanecei no meu amor. Se guardardes os meus mandamentos, permanecereis no meu amor, assim como eu tenho guardado os mandamentos de meu Pai, e permaneço no seu amor. Estas coisas vos tenho dito, para que o meu gozo esteja em vós, e o vosso gozo seja completo. O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.",
  },
  fonte: "offline",
};
