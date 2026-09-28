export type Pregacao = {
  slug: string;
  titulo: string;
  evento: string;
  data?: string;
  descricao?: string;
  /** arquivo em /public/audio/pregacoes/<slug>.mp3 — só depois de comprimido (ver README) */
  audio?: string;
  imagem?: string;
};

export const pregacoes: Pregacao[] = [
  {
    slug: "ate-encontra-la",
    titulo: "Até Encontrá-la",
    evento: "Retiro Desperta",
    descricao: "Pregação do Retiro Desperta. Áudio a caminho — ver nota no card.",
  },
];
