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
 * Só livros católicos. Quando o documento já é distribuído oficialmente
 * em PDF (Vaticano), baixamos e hospedamos o arquivo aqui mesmo
 * (public/livros/) — abre e baixa direto do site, sem sair pra outro
 * lugar. Quando só existe como página (sem PDF na fonte) ou é obra de
 * terceiro sem autorização de redistribuição, linkamos pra fonte oficial.
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
    titulo: "Compêndio do Catecismo da Igreja Católica",
    autor: "Igreja Católica",
    descricao: "Síntese oficial e fiel do Catecismo, em perguntas e respostas.",
    url: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
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
    titulo: "A Imitação de Cristo",
    autor: "Tomás de Kempis",
    descricao: "Um dos livros espirituais mais lidos da história — devoção simples e profunda.",
    url: "https://archive.org/details/tomas-de-kempis-imitacao-de-cristo",
    fonte: "Internet Archive",
    formato: "Ler online",
  },
  {
    titulo: "Gaudete et Exsultate",
    autor: "Papa Francisco",
    descricao: "Exortação apostólica sobre o chamado à santidade no mundo atual.",
    url: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20180319_gaudete-et-exsultate.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
  },
  {
    titulo: "Dilexit Nos",
    autor: "Papa Francisco",
    descricao: "Encíclica sobre o amor humano e divino do Coração de Jesus Cristo — cita Santa Margarida Maria Alacoque.",
    url: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/20241024-enciclica-dilexit-nos.html",
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
  {
    titulo: "São Pio de Pietrelcina (Padre Pio)",
    autor: "Congregação para as Causas dos Santos",
    descricao: "Biografia oficial publicada pelo Vaticano por ocasião da beatificação.",
    url: "https://www.vatican.va/roman_curia/congregations/csaints/documents/rc_con_csaints_doc_19990502_padre-pio_po.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
  },
  {
    titulo: "São Francisco de Assis",
    autor: "Papa Bento XVI",
    descricao: "Catequese sobre a vida e a espiritualidade de São Francisco, numa audiência geral.",
    url: "https://www.vatican.va/content/benedict-xvi/pt/audiences/2010/documents/hf_ben-xvi_aud_20100127.html",
    fonte: "vatican.va (oficial)",
    formato: "Ler online",
  },
  {
    titulo: "Santo Antônio de Pádua",
    autor: "diversos",
    descricao: "Biografia do santo dos objetos perdidos, um dos mais queridos do povo católico.",
    url: "https://franciscanos.org.br/conventosantoantonio/biografia/",
    fonte: "Franciscanos.org.br",
    formato: "Ler online",
  },
  {
    titulo: "Santa Margarida Maria Alacoque",
    autor: "diversos",
    descricao: "A vida da religiosa que recebeu as revelações do Sagrado Coração de Jesus.",
    url: "https://www.vaticannews.va/pt/santo-do-dia/10/16/s--margarida-maria-alacoque--virgem--da-ordem-da-visitacao.html",
    fonte: "Vatican News (oficial)",
    formato: "Ler online",
  },
  {
    titulo: "Beata Ana Catarina Emmerich",
    autor: "diversos",
    descricao: "A mística agostiniana alemã, cujas visões da Paixão inspiraram gerações.",
    url: "https://revista.arautos.org/beata-ana-catarina-emmerich-esposa-de-cristo-crucificado/",
    fonte: "Revista Arautos do Evangelho",
    formato: "Ler online",
  },
];
