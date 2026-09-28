export type PregacaoYouTube = {
  titulo: string;
  youtubeId: string;
  data?: string;
};

export const CANAL_MOISES_ROCHA = {
  nome: "Comunidade Filhos de João Batista",
  url: "https://www.youtube.com/channel/UClNauiXYCExotB5HCcVdATw",
};

/**
 * Pregações de Moisés Rocha, fundador da Comunidade Filhos de João Batista.
 * Vídeos embutidos direto do YouTube — o crédito e a receita de publicidade
 * são do canal original. Adicionar aqui conforme a lista que a equipe mandar.
 */
export const pregacoesMoisesRocha: PregacaoYouTube[] = [
  { titulo: "Não seja um católico que não conhece Jesus!", youtubeId: "JfGeUPayysY" },
  { titulo: "Os teus passos serão guardados pelos Anjos!", youtubeId: "Nv0AFNxY6FE", data: "26/09/2024" },
  { titulo: "As 4 funções do Espírito Santo em sua vida", youtubeId: "6YGpiAgHImM" },
  { titulo: "Abraão: a dor da espera e do sacrifício", youtubeId: "mT07GQmTryM" },
  { titulo: "Mulheres empoderadas por Deus", youtubeId: "3WsThADK_-o" },
  { titulo: "Sabemos tudo mas não temos coragem (Retiro para servos)", youtubeId: "JmWLx_Y8YEw" },
];
