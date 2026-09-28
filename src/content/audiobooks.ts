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
  /** áudio embutido do YouTube — quando o livro tem faixas assim */
  faixas?: FaixaAudiobook[];
  /** quando o áudio mora no site de origem (sem embed possível) — abre lá */
  linkExterno?: string;
  /** o site de origem pede login pra tocar */
  requerLogin?: boolean;
};

/**
 * Só livros católicos. Prioridade pra áudio embutido do YouTube (crédito
 * ao autor e ao canal); quando o áudio só existe no site de origem
 * (players próprios, às vezes com login), linkamos pra lá em vez de
 * tentar embutir — republicar o arquivo exigiria autorização dos donos.
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
  {
    slug: "tratado-verdadeira-devocao",
    titulo: "Tratado da Verdadeira Devoção à Santíssima Virgem",
    autor: "São Luís Maria Grignion de Montfort",
    descricao:
      "O clássico da espiritualidade mariana sobre a consagração a Jesus por Maria — base da devoção de tantos santos.",
    canalNome: "Fraternidade Filhos de Maria",
    linkExterno: "https://filhosdemaria.org/consagracao/tratado-da-verdadeira-devocao-em-audio-on-line/",
  },
  {
    slug: "vida-dos-santos-loyola",
    titulo: "A Vida dos Santos — Volume 1",
    autor: "diversos",
    descricao: "Coletânea de vidas de santos, narrada por Francisco Cuoco, das Edições Loyola.",
    canalNome: "Edições Loyola",
    linkExterno:
      "https://loyola.audiolivros.com.br/audiolivro-livro-audiobook-a-vida-dos-santos-volume-1-tania-d-jordao-paulo-s-soares-e-edw-francisco-cuoco-edicoes-loyola-gratis-free-online.html",
  },
];

export function acharAudiobook(slug: string): Audiobook | undefined {
  return audiobooks.find((a) => a.slug === slug);
}
