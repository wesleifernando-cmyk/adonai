export type FaixaAudiobook = {
  titulo: string;
  youtubeId: string;
};

export type Audiobook = {
  slug: string;
  titulo: string;
  autor: string;
  descricao: string;
  canalNome: string;
  canalUrl?: string;
  faixas: FaixaAudiobook[];
};

/**
 * Só livros católicos. Áudio embutido do YouTube — crédito ao autor
 * original e ao canal que narrou/publicou. Nada baixado ou reidesignado.
 */
export const audiobooks: Audiobook[] = [
  {
    slug: "gloria-polo",
    titulo: "O Livro da Vida — Da Ilusão à Verdade",
    autor: "Glória Polo",
    descricao:
      "O testemunho completo da dentista colombiana Glória Polo, atingida por um raio em 1995 e transformada por uma experiência de quase morte.",
    canalNome: "diversos canais católicos",
    faixas: [{ titulo: "Audiobook completo", youtubeId: "4WRTEUgX6n8" }],
  },
  {
    slug: "confissoes-agostinho",
    titulo: "Confissões",
    autor: "Santo Agostinho",
    descricao:
      "O clássico relato autobiográfico da conversão de Santo Agostinho, Doutor da Igreja — uma das obras mais lidas da literatura cristã.",
    canalNome: "canais de audiolivros católicos",
    faixas: [
      { titulo: "Audiolivro completo", youtubeId: "DKk-SSFRfy0" },
      { titulo: "Livro I", youtubeId: "FPUpfNx1STE" },
    ],
  },
  {
    slug: "biblia-cid-moreira",
    titulo: "A Bíblia Narrada",
    autor: "Narrada por Cid Moreira",
    descricao:
      "A Bíblia inteira narrada, livro por livro, pelo jornalista Cid Moreira. O canal tem todos os livros — aqui começam quatro deles.",
    canalNome: "A Bíblia Narrada",
    canalUrl: "https://www.youtube.com/c/AB%C3%ADbliaNarrada/videos",
    faixas: [
      { titulo: "Gênesis (completo)", youtubeId: "SIP0RXx90Bw" },
      { titulo: "Salmos (completo)", youtubeId: "jd8ULYrZ4dw" },
      { titulo: "Provérbios (completo)", youtubeId: "DfJpREE8veE" },
      { titulo: "João (completo)", youtubeId: "BpOhcilDdxk" },
    ],
  },
];

export function acharAudiobook(slug: string): Audiobook | undefined {
  return audiobooks.find((a) => a.slug === slug);
}
