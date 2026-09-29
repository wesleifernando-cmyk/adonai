export type Livro = {
  slug: string;
  titulo: string;
  autor: string;
  descricao: string;
  /** caminho do PDF em public/livros — sempre hospedado aqui, nunca link externo */
  url: string;
  fonte: string;
};

/**
 * Só livros de verdade, com PDF baixado e hospedado aqui mesmo
 * (public/livros/) — abre num leitor dentro do site, com progresso e
 * grifos salvos na conta da pessoa. Nada de "ler no site tal": se não
 * tem PDF confirmado pra baixar, o livro não entra nessa lista (nada
 * de biografia de santo também — isso mora em Heróis da Fé/Santos).
 */
export const livros: Livro[] = [
  {
    slug: "laudato-si",
    titulo: "Laudato Si'",
    autor: "Papa Francisco",
    descricao: "Carta encíclica sobre o cuidado da casa comum.",
    url: "/livros/laudato-si.pdf",
    fonte: "vatican.va (oficial)",
  },
  {
    slug: "evangelii-gaudium",
    titulo: "Evangelii Gaudium",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o anúncio do Evangelho no mundo atual.",
    url: "/livros/evangelii-gaudium.pdf",
    fonte: "vatican.va (oficial)",
  },
  {
    slug: "gaudete-et-exsultate",
    titulo: "Gaudete et Exsultate",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o chamado à santidade no mundo atual.",
    url: "/livros/gaudete-et-exsultate.pdf",
    fonte: "vatican.va (oficial)",
  },
  {
    slug: "dilexit-nos",
    titulo: "Dilexit Nos",
    autor: "Papa Francisco",
    descricao: "Encíclica sobre o amor humano e divino do Coração de Jesus Cristo.",
    url: "/livros/dilexit-nos.pdf",
    fonte: "vatican.va (oficial)",
  },
  {
    slug: "codigo-direito-canonico",
    titulo: "Código de Direito Canônico",
    autor: "Igreja Católica",
    descricao: "O texto oficial completo da lei da Igreja, em português.",
    url: "/livros/codigo-direito-canonico.pdf",
    fonte: "vatican.va (oficial)",
  },
  {
    slug: "confissoes-agostinho",
    titulo: "Confissões",
    autor: "Santo Agostinho",
    descricao: "A autobiografia espiritual mais lida da história cristã — a conversão de um dos maiores Doutores da Igreja.",
    url: "/livros/confissoes-agostinho.pdf",
    fonte: "Internet Archive",
  },
  {
    slug: "imitacao-de-cristo",
    titulo: "A Imitação de Cristo",
    autor: "Tomás de Kempis",
    descricao: "Um dos livros espirituais mais lidos da história — devoção simples e profunda.",
    url: "/livros/imitacao-de-cristo.pdf",
    fonte: "Internet Archive",
  },
];
