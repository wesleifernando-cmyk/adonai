/** Deixa só os números do que a pessoa digitou. */
export function soDigitos(v: string): string {
  return v.replace(/\D/g, "");
}

/** Máscara simples enquanto digita: (11) 91234-5678 */
export function mascaraTelefone(v: string): string {
  let d = soDigitos(v);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Telefone válido (DDD + 8 ou 9 dígitos). */
export function telefoneValido(v: string): boolean {
  let d = soDigitos(v);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  return d.length === 10 || d.length === 11;
}

/** Formata um telefone salvo ("5511912345678") para exibir. */
export function telefoneBonito(salvo: string): string {
  const d = soDigitos(salvo);
  return mascaraTelefone(d.startsWith("55") ? d.slice(2) : d);
}

/** Link clicável do WhatsApp, já com a mensagem escrita. */
export function linkWhatsApp(salvo: string, mensagem?: string): string {
  const d = soDigitos(salvo);
  const numero = d.startsWith("55") ? d : `55${d}`;
  return `https://wa.me/${numero}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;
}
