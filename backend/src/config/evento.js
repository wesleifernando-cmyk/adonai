// Dados do evento e preço do convite. Tudo pode ser trocado por variável
// de ambiente no Railway, sem mexer no código.
export const EVENTO = {
  nome: process.env.EVENTO_NOME || "Que Nasça em Nós · Luau Especial de Natal",
  data: process.env.EVENTO_DATA || "20 de dezembro de 2026",
  local: process.env.EVENTO_LOCAL || "Local e horário em breve",
  descricao: process.env.EVENTO_DESCRICAO || "Último grupo do ano, fim da novena de Natal, com participação especial do Sacrário.",
  precoCentavos: Number(process.env.CONVITE_PRECO_CENTAVOS) || 1500,
  maxPorPedido: Number(process.env.CONVITE_MAX_POR_PEDIDO) || 20,
  // limite total de convites vendidos (0 = sem limite)
  limiteTotal: Number(process.env.CONVITE_LIMITE_TOTAL) || 0,
};

export const urlFrontend = () => process.env.FRONTEND_URL || "http://localhost:5173";
export const urlBackend = () => process.env.BACKEND_URL || "https://adonai-production-7dcf.up.railway.app";
