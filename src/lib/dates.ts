const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

const DIAS = [
  "domingo", "segunda-feira", "terça-feira", "quarta-feira",
  "quinta-feira", "sexta-feira", "sábado"
];

/** Ex.: "terça-feira, 2 de setembro" */
export function todayLong(d = new Date()): string {
  return `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

/** Chave estável do dia no fuso local — "2026-09-02". Serve para
 *  rotacionar conteúdo (santo do dia, devocional) sem depender de API. */
export function dayKey(d = new Date()): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
}

/** Dia do ano (1–366) — usado para escolher item numa lista de forma determinística. */
export function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

/** Escolhe um item da lista de forma estável para o dia. */
export function pickForToday<T>(list: readonly T[], d = new Date()): T {
  return list[dayOfYear(d) % list.length];
}

/** "25/10/2026" a partir de uma data ISO */
export function dataCurta(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

/** "faltam 12 dias" / "vence hoje" */
export function textoDiasRestantes(dias: number): string {
  if (dias <= 0) return "vence hoje";
  if (dias === 1) return "falta 1 dia";
  return `faltam ${dias} dias`;
}
