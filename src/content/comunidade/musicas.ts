export type GrupoMusical = {
  slug: string;
  nome: string;
  descricao: string;
  tipo: "artist" | "playlist";
  spotifyId: string;
  curadoriaPor?: string;
};

/** Grupos e comunidades de música católica, embutidos direto do Spotify. */
export const gruposMusicais: GrupoMusical[] = [
  {
    slug: "adonai",
    nome: "Adonai",
    descricao: "O louvor da Missão Adonai.",
    tipo: "artist",
    spotifyId: "7HyPrXw9pPiT9KFtG8frwn",
  },
  {
    slug: "colo-de-deus",
    nome: "Colo de Deus",
    descricao: "Comunidade Católica Colo de Deus — \"Casa\", \"Eis-Me Aqui\", \"Queima de Novo\" e outros grandes sucessos.",
    tipo: "artist",
    spotifyId: "1AY6YtpuVujP4Pa3ibD1M1",
  },
  {
    slug: "flavinho",
    nome: "Flavinho",
    descricao: "Missionário consagrado pela Canção Nova por 16 anos; autor de \"Deus É Maior\" e \"Incendeia Minha Alma\".",
    tipo: "artist",
    spotifyId: "3H7Mab3ekd2nFkjy9n6co4",
  },
  {
    slug: "cristo-alegria",
    nome: "Cristo Alegria",
    descricao: "Comunidade nascida em 2001 com a missão de levar a alegria de Cristo ao mundo.",
    tipo: "artist",
    spotifyId: "4qsj59g2x0oYzuOuXagY3J",
  },
  {
    slug: "fraternidade-o-caminho",
    nome: "Fraternidade O Caminho",
    descricao: "Comunidade plurivocacional formada por consagrados, sacerdotes e leigos.",
    tipo: "artist",
    spotifyId: "4oXk5J4Mxk3L7NY98lzv6y",
  },
  {
    slug: "em-alta",
    nome: "Em alta",
    descricao: "As músicas católicas mais ouvidas do momento — playlist atualizada por outros ouvintes.",
    tipo: "playlist",
    spotifyId: "3V4Z2cP9bUpbOKtrhy8W3o",
    curadoriaPor: "Amo Música Católica",
  },
];

export function acharGrupoMusical(slug: string): GrupoMusical | undefined {
  return gruposMusicais.find((g) => g.slug === slug);
}
