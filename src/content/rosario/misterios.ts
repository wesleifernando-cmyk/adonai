export type Misterio = {
  titulo: string;
  referencia: string;
  meditacao: string;
};

export type ConjuntoMisterios = {
  slug: "gozosos" | "dolorosos" | "gloriosos" | "luminosos";
  nome: string;
  dias: string;
  cor: string;
  resumo: string;
  misterios: Misterio[];
};

export const conjuntos: ConjuntoMisterios[] = [
  {
    slug: "gozosos",
    nome: "Mistérios Gozosos",
    dias: "Segunda-feira e sábado",
    cor: "#4a8f6b",
    resumo: "A alegria da espera: a Encarnação e a infância de Jesus.",
    misterios: [
      {
        titulo: "A Anunciação",
        referencia: "Lucas 1,26-38",
        meditacao:
          "O anjo Gabriel anuncia a Maria que ela será a mãe do Salvador. Ela responde: \"Faça-se em mim segundo a tua palavra.\" Medite no seu próprio \"sim\" a Deus, mesmo sem entender tudo.",
      },
      {
        titulo: "A Visitação",
        referencia: "Lucas 1,39-56",
        meditacao:
          "Maria vai ao encontro de Isabel e ajuda a prima grávida. Ao ouvir a saudação, Isabel é cheia do Espírito Santo. Medite no serviço simples que carrega a presença de Deus.",
      },
      {
        titulo: "A Natividade de Jesus",
        referencia: "Lucas 2,1-20",
        meditacao:
          "Jesus nasce numa manjedoura, entre pastores e animais. Deus escolhe a pobreza para se aproximar de todos. Medite na simplicidade como caminho até o Senhor.",
      },
      {
        titulo: "A Apresentação no Templo",
        referencia: "Lucas 2,22-38",
        meditacao:
          "Maria e José levam o Menino ao Templo, cumprindo a Lei. Simeão o reconhece como a luz das nações. Medite na obediência que confia mesmo sem ver o final da história.",
      },
      {
        titulo: "O Menino Jesus encontrado no Templo",
        referencia: "Lucas 2,41-52",
        meditacao:
          "Depois de três dias de busca aflita, Maria e José encontram Jesus entre os doutores da Lei. \"Eu devia estar na casa de meu Pai.\" Medite nos momentos em que Deus parece perdido de vista, e na paciência de continuar buscando.",
      },
    ],
  },
  {
    slug: "luminosos",
    nome: "Mistérios Luminosos",
    dias: "Quinta-feira",
    cor: "#3d7ea6",
    resumo: "A vida pública de Jesus: os mistérios da luz, acrescentados por São João Paulo II.",
    misterios: [
      {
        titulo: "O Batismo de Jesus no Jordão",
        referencia: "Mateus 3,13-17",
        meditacao:
          "O céu se abre e o Pai declara: \"Este é o meu Filho amado.\" Jesus, sem pecado, desce às águas para se solidarizar conosco. Medite na sua própria identidade de filho ou filha amada de Deus.",
      },
      {
        titulo: "As bodas de Caná",
        referencia: "João 2,1-11",
        meditacao:
          "\"Fazei tudo o que ele vos disser\", diz Maria aos serventes. Jesus transforma água em vinho, seu primeiro sinal. Medite na intercessão de Maria e na confiança de obedecer sem entender o resultado.",
      },
      {
        titulo: "O anúncio do Reino e o convite à conversão",
        referencia: "Marcos 1,14-15",
        meditacao:
          "\"Convertei-vos e crede no Evangelho.\" Jesus começa a pregar, chamar discípulos e curar. Medite no que em você ainda precisa se converter hoje.",
      },
      {
        titulo: "A Transfiguração",
        referencia: "Mateus 17,1-8",
        meditacao:
          "No monte, o rosto de Jesus brilha como o sol diante de Pedro, Tiago e João. Um vislumbre da glória antes da cruz. Medite na luz que sustenta a fé nos momentos escuros.",
      },
      {
        titulo: "A instituição da Eucaristia",
        referencia: "Mateus 26,26-29",
        meditacao:
          "\"Isto é o meu corpo... isto é o meu sangue.\" Na última ceia, Jesus se entrega como pão e vinho. Medite na Eucaristia como memorial vivo desse amor entregue por você.",
      },
    ],
  },
  {
    slug: "dolorosos",
    nome: "Mistérios Dolorosos",
    dias: "Terça-feira e sexta-feira",
    cor: "#8a2b2b",
    resumo: "O caminho da cruz: a Paixão de Jesus, passo a passo.",
    misterios: [
      {
        titulo: "A agonia de Jesus no horto",
        referencia: "Lucas 22,39-46",
        meditacao:
          "\"Pai, se queres, afasta de mim este cálice; mas não se faça a minha vontade, e sim a tua.\" Jesus sua sangue diante do medo. Medite na oração honesta, que não esconde a dor de Deus.",
      },
      {
        titulo: "A flagelação",
        referencia: "João 19,1",
        meditacao:
          "Jesus é açoitado por nossos pecados. \"Pelas suas chagas fomos curados\" (Isaías 53,5). Medite no preço real do amor que perdoa.",
      },
      {
        titulo: "A coroação de espinhos",
        referencia: "Mateus 27,27-31",
        meditacao:
          "Zombam dele como \"rei dos judeus\", cravando espinhos em sua cabeça. Ele aceita o escárnio em silêncio. Medite nas vezes em que você zombou ou foi zombado, e no perdão que isso pede.",
      },
      {
        titulo: "Jesus carrega a cruz",
        referencia: "João 19,17",
        meditacao:
          "Jesus mesmo carrega o madeiro até o Calvário. Simão de Cirene é chamado a ajudar. Medite em que cruz você está carregando hoje, e quem Deus coloca ao seu lado.",
      },
      {
        titulo: "A crucificação e morte de Jesus",
        referencia: "Lucas 23,33-46",
        meditacao:
          "\"Pai, em tuas mãos entrego o meu espírito.\" Do alto da cruz, Jesus ainda perdoa e acolhe o bom ladrão. Medite na entrega total, até o fim.",
      },
    ],
  },
  {
    slug: "gloriosos",
    nome: "Mistérios Gloriosos",
    dias: "Quarta-feira e domingo",
    cor: "#a67c3d",
    resumo: "A vitória da vida: a Ressurreição e a glória que espera todo cristão.",
    misterios: [
      {
        titulo: "A Ressurreição de Jesus",
        referencia: "João 20,1-18",
        meditacao:
          "O túmulo está vazio. Jesus vive! Medite na esperança que não se apaga nem diante da morte.",
      },
      {
        titulo: "A Ascensão de Jesus ao Céu",
        referencia: "Atos 1,6-11",
        meditacao:
          "Jesus é elevado ao Céu diante dos apóstolos, prometendo o Espírito Santo. Medite na missão que fica para quem permanece na terra.",
      },
      {
        titulo: "A vinda do Espírito Santo",
        referencia: "Atos 2,1-4",
        meditacao:
          "Línguas de fogo pousam sobre os apóstolos, e eles saem anunciando sem medo. Medite em pedir, hoje, um novo fogo do Espírito na sua vida.",
      },
      {
        titulo: "A Assunção de Nossa Senhora ao Céu",
        referencia: "Apocalipse 12,1",
        meditacao:
          "Maria é levada de corpo e alma à glória, sinal do que espera todo aquele que segue seu Filho. Medite na esperança de uma vida que continua além daqui.",
      },
      {
        titulo: "A coroação de Nossa Senhora como Rainha",
        referencia: "Apocalipse 12,1",
        meditacao:
          "Maria é coroada Rainha do Céu e da Terra, Mãe e intercessora de todos. Medite em pedir hoje, com confiança de filho, a sua intercessão.",
      },
    ],
  },
];

export function conjuntoDoDia(d = new Date()): ConjuntoMisterios {
  const dia = d.getDay(); // 0 dom .. 6 sáb
  const porDia: Record<number, ConjuntoMisterios["slug"]> = {
    0: "gloriosos",
    1: "gozosos",
    2: "dolorosos",
    3: "gloriosos",
    4: "luminosos",
    5: "dolorosos",
    6: "gozosos",
  };
  const slug = porDia[dia];
  return conjuntos.find((c) => c.slug === slug)!;
}

export function acharConjunto(slug: string): ConjuntoMisterios | undefined {
  return conjuntos.find((c) => c.slug === slug);
}
