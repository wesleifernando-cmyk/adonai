// Guarda o telefone só com números, com o código do Brasil na frente
// (ex.: "5511912345678"), pra montar o link do WhatsApp direto.
// Devolve null se não parecer um telefone brasileiro (DDD + 8 ou 9 dígitos).
export function normalizarTelefone(valor) {
  let d = String(valor ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (d.length === 10 || d.length === 11) d = "55" + d;
  if (!/^55\d{10,11}$/.test(d)) return null;
  return d;
}
