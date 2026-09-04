export type Aparicao = {
  slug: string;
  titulo: string;
  local: string;
  ano: string;
  destaque?: boolean;
  resumo: string;
  historia: string[];
  /** arquivo em /public/rosario/<slug>.jpg — preencher quando houver imagem de uso livre */
  imagem?: string;
  imagemCredito?: string;
};

export const aparicoes: Aparicao[] = [
  {
    slug: "aparecida",
    titulo: "Nossa Senhora Aparecida",
    local: "Rio Paraíba do Sul, Aparecida (SP) — Brasil",
    ano: "1717",
    destaque: true,
    resumo:
      "Padroeira do Brasil. Uma pequena imagem de barro, achada nas águas por pescadores, deu origem ao maior santuário mariano do mundo.",
    historia: [
      "Em outubro de 1717, três pescadores lançaram as redes no rio Paraíba do Sul e nada pescavam. Na rede veio, primeiro, o corpo de uma imagem de Nossa Senhora da Conceição, de barro escurecido; lançando de novo a rede, veio a cabeça. Juntas as duas partes, a pesca se fartou.",
      "A devoção cresceu entre os moradores da região, e a imagem — hoje conhecida como Nossa Senhora Aparecida — foi tida por milagrosa. Em 1930, o Papa Pio XI a proclamou Padroeira Principal do Brasil. Sua festa é celebrada em 12 de outubro, e seu santuário, na cidade de Aparecida (SP), é um dos mais visitados do mundo.",
    ],
  },
  {
    slug: "guadalupe",
    titulo: "Nossa Senhora de Guadalupe",
    local: "Colina do Tepeyac, Cidade do México",
    ano: "1531",
    resumo:
      "Apareceu ao indígena São Juan Diego e deixou sua imagem impressa numa tilma, venerada até hoje sem explicação científica conclusiva.",
    historia: [
      "Em dezembro de 1531, Nossa Senhora apareceu várias vezes ao camponês indígena Juan Diego, pedindo que um templo fosse construído em sua honra. Como prova diante do bispo incrédulo, ela fez florescer rosas fora de época e as fez cair da tilma de Juan Diego — e nela ficou impressa sua imagem, que permanece intacta até hoje.",
      "A aparição impulsionou a evangelização de milhões de indígenas na América. É Padroeira das Américas, e sua festa é celebrada em 12 de dezembro.",
    ],
  },
  {
    slug: "lourdes",
    titulo: "Nossa Senhora de Lourdes",
    local: "Lourdes, França",
    ano: "1858",
    resumo:
      "Apareceu 18 vezes à jovem Bernadette Soubirous, revelando-se: \"Eu sou a Imaculada Conceição.\"",
    historia: [
      "Entre fevereiro e julho de 1858, uma \"Senhora\" vestida de branco apareceu à menina de 14 anos Bernadette Soubirous numa gruta perto do rio Gave. Pediu penitência e oração pelos pecadores, e fez brotar uma fonte de água que até hoje é associada a curas.",
      "Quando Bernadette perguntou seu nome, a Senhora respondeu em dialeto local: \"Eu sou a Imaculada Conceição\" — confirmando o dogma proclamado pelo Papa Pio IX apenas quatro anos antes. Lourdes tornou-se um dos maiores santuários de peregrinação e cura do mundo.",
    ],
  },
  {
    slug: "fatima",
    titulo: "Nossa Senhora de Fátima",
    local: "Fátima, Portugal",
    ano: "1917",
    resumo:
      "Apareceu a três pastorinhos pedindo oração do Rosário e penitência pela paz do mundo, em plena Primeira Guerra Mundial.",
    historia: [
      "De maio a outubro de 1917, Nossa Senhora apareceu aos pastorinhos Lúcia, Francisco e Jacinta, pedindo insistentemente que rezassem o Rosário todos os dias pela paz e pela conversão dos pecadores. Confiou-lhes três segredos e pediu penitência.",
      "Na última aparição, em 13 de outubro, ocorreu diante de milhares de pessoas o chamado \"milagre do sol\", relatado até por jornais não católicos da época. Francisco e Jacinta morreram poucos anos depois e foram canonizados; Lúcia viveu como religiosa carmelita até 2005.",
    ],
  },
  {
    slug: "medalha-milagrosa",
    titulo: "Nossa Senhora das Graças (Medalha Milagrosa)",
    local: "Rua du Bac, Paris, França",
    ano: "1830",
    resumo:
      "Apareceu à noviça Santa Catarina Labouré e pediu a cunhagem de uma medalha com a jaculatória \"Ó Maria concebida sem pecado, rogai por nós\".",
    historia: [
      "Em 1830, a Virgem apareceu à jovem noviça Catarina Labouré na capela das Filhas da Caridade, em Paris, mostrando-se de pé sobre um globo, com raios de luz saindo das mãos e uma oração ao redor: \"Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.\"",
      "Pediu que se cunhasse uma medalha com essa imagem. Distribuída em massa, ficou conhecida como \"Medalha Milagrosa\" pelas inúmeras graças atribuídas a quem a usava com fé. Catarina guardou o segredo da aparição por décadas, revelando-o só ao superior antes de morrer.",
    ],
  },
];

export function acharAparicao(slug: string): Aparicao | undefined {
  return aparicoes.find((a) => a.slug === slug);
}
