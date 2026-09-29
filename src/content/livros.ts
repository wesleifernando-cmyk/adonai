export type Livro = {
  slug?: string;
  titulo: string;
  autor: string;
  descricao: string;
  url: string;
  fonte: string;
  formato: "PDF" | "Ler online";
  /** true = o PDF está baixado e hospedado aqui mesmo (public/livros); abre num leitor dentro do site */
  local?: boolean;
};

/**
 * Só livros de verdade — nada de página de biografia de santo (isso já
 * mora em Heróis da Fé/Santos). Quando o documento já é distribuído
 * oficialmente em PDF (Vaticano, Internet Archive), baixamos e
 * hospedamos o arquivo aqui mesmo (public/livros/) — abre num leitor
 * dentro do site, com progresso e grifos salvos na conta da pessoa.
 * Quando não existe PDF de verdade na fonte (só página HTML) ou é obra
 * de terceiro sem tradução livre confirmada, linkamos pra fonte oficial.
 */
export const livros: Livro[] = [
  {
    slug: "laudato-si",
    titulo: "Laudato Si'",
    autor: "Papa Francisco",
    descricao: "Carta encíclica sobre o cuidado da casa comum.",
    url: "/livros/laudato-si.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
    local: true,
  },
  {
    slug: "evangelii-gaudium",
    titulo: "Evangelii Gaudium",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o anúncio do Evangelho no mundo atual.",
    url: "/livros/evangelii-gaudium.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
    local: true,
  },
  {
    slug: "gaudete-et-exsultate",
    titulo: "Gaudete et Exsultate",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o chamado à santidade no mundo atual.",
    url: "/livros/gaudete-et-exsultate.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
    local: true,
  },
  {
    slug: "dilexit-nos",
    titulo: "Dilexit Nos",
    autor: "Papa Francisco",
    descricao: "Encíclica sobre o amor humano e divino do Coração de Jesus Cristo.",
    url: "/livros/dilexit-nos.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
    local: true,
  },
  {
    slug: "codigo-direito-canonico",
    titulo: "Código de Direito Canônico",
    autor: "Igreja Católica",
    descricao: "O texto oficial completo da lei da Igreja, em português.",
    url: "/livros/codigo-direito-canonico.pdf",
    fonte: "vatican.va (oficial)",
    formato: "PDF",
    local: true,
  },
  {
    slug: "confissoes-agostinho",
    titulo: "Confissões",
    autor: "Santo Agostinho",
    descricao: "A autobiografia espiritual mais lida da história cristã — a conversão de um dos maiores Doutores da Igreja.",
    url: "/livros/confissoes-agostinho.pdf",
    fonte: "Internet Archive",
    formato: "PDF",
    local: true,
  },
  {
    slug: "imitacao-de-cristo",
    titulo: "A Imitação de Cristo",
    autor: "Tomás de Kempis",
    descricao: "Um dos livros espirituais mais lidos da história — devoção simples e profunda.",
    url: "/livros/imitacao-de-cristo.pdf",
    fonte: "Internet Archive",
    formato: "PDF",
    local: true,
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
    titulo: "Deus Caritas Est",
    autor: "Papa Bento XVI",
    descricao: "Encíclica sobre o amor de Deus e a caridade cristã.",
    url: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20051225_deus-caritas-est.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
  },
];
