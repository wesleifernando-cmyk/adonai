export type Livro = {
  titulo: string;
  autor: string;
  descricao: string;
  url: string;
  fonte: string;
  formato: "PDF" | "Ler online";
};

/**
 * Só livros católicos, sempre de fontes oficiais ou de domínio público
 * verificável (Vaticano, Internet Archive). Nada hospedado aqui — só
 * link para a fonte, com crédito.
 */
export const livros: Livro[] = [
  {
    titulo: "Laudato Si'",
    autor: "Papa Francisco",
    descricao: "Carta encíclica sobre o cuidado da casa comum.",
    url: "https://www.vatican.va/content/dam/francesco/pdf/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si_po.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
  },
  {
    titulo: "Evangelii Gaudium",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o anúncio do Evangelho no mundo atual.",
    url: "https://www.vatican.va/content/dam/francesco/pdf/apost_exhortations/documents/papa-francesco_esortazione-ap_20131124_evangelii-gaudium_po.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
  },
  {
    titulo: "Compêndio do Catecismo da Igreja Católica",
    autor: "Igreja Católica",
    descricao: "Síntese oficial e fiel do Catecismo, em perguntas e respostas.",
    url: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
  },
  {
    titulo: "Código de Direito Canônico",
    autor: "Igreja Católica",
    descricao: "O texto oficial completo da lei da Igreja, em português.",
    url: "https://www.vatican.va/archive/cod-iuris-canonici/portuguese/codex-iuris-canonici_po.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
  },
  {
    titulo: "A Imitação de Cristo",
    autor: "Tomás de Kempis",
    descricao: "Um dos livros espirituais mais lidos da história — devoção simples e profunda.",
    url: "https://archive.org/details/tomas-de-kempis-imitacao-de-cristo",
    fonte: "Internet Archive",
    formato: "Ler online",
  },
];
