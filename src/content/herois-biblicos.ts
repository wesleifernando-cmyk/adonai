export type HeroiBiblico = {
  slug: string;
  nome: string;
  papel: string;
  livro: string;
  resumo: string;
  historia: string[];
  licao: string;
};

/** Personagens bíblicos. Fatos das próprias Escrituras (domínio público). */
export const heroisBiblicos: HeroiBiblico[] = [
  {
    slug: "abraao",
    nome: "Abraão",
    papel: "Pai da fé",
    livro: "Gênesis 12–25",
    resumo:
      "Deixou sua terra apenas com uma promessa de Deus e creu, mesmo sem ver o cumprimento em vida.",
    historia: [
      "Deus chamou Abrão em Ur para deixar parentes e terra rumo a um lugar que só seria mostrado depois. Ele partiu aos 75 anos.",
      "A promessa de uma descendência numerosa demorou décadas e passou pelo teste extremo do sacrifício de Isaac, interrompido por Deus. Paulo o chama de \"pai de todos os que creem\".",
    ],
    licao: "A fé caminha antes de entender o mapa inteiro.",
  },
  {
    slug: "moises",
    nome: "Moisés",
    papel: "Libertador e legislador",
    livro: "Êxodo – Deuteronômio",
    resumo:
      "Tirou Israel da escravidão no Egito e recebeu a Lei no Sinai. Guiou o povo por quarenta anos no deserto.",
    historia: [
      "Salvo das águas quando bebê, criado na corte egípcia, fugiu após matar um capataz. No episódio da sarça ardente, Deus o enviou de volta para libertar o povo.",
      "Depois das pragas e da travessia do mar, conduziu Israel ao Sinai, onde recebeu os Dez Mandamentos. Intercedeu muitas vezes pelo povo, mas não entrou na Terra Prometida.",
    ],
    licao: "Deus costuma chamar quem se acha despreparado.",
  },
  {
    slug: "davi",
    nome: "Davi",
    papel: "Rei e salmista",
    livro: "1–2 Samuel, Salmos",
    resumo:
      "Pastor que venceu Golias, tornou-se rei de Israel e escreveu boa parte dos salmos. Pecou gravemente e se arrependeu de coração.",
    historia: [
      "Ungido ainda jovem por Samuel, ganhou fama ao derrotar o gigante filisteu com uma funda. Serviu e foi perseguido pelo rei Saul antes de assumir o trono.",
      "Como rei, unificou o país e trouxe a Arca para Jerusalém. Caiu no adultério com Betsabé e na morte de Urias; confrontado pelo profeta Natã, compôs o Salmo 51, súplica de perdão.",
    ],
    licao: "Não é o pecado que define um coração, mas o que ele faz depois.",
  },
  {
    slug: "rute",
    nome: "Rute",
    papel: "A estrangeira fiel",
    livro: "Livro de Rute",
    resumo:
      "Moabita que escolheu ficar com a sogra viúva, Noemi, e acabou entrando na linhagem de Davi e de Jesus.",
    historia: [
      "Viúva e sem filhos, Rute recusou voltar ao seu povo: \"teu povo será o meu povo, e o teu Deus será o meu Deus\".",
      "Em Belém, trabalhou nos campos de Boaz, que a resgatou pelo costume do parente redentor. O filho deles, Obed, foi avô de Davi.",
    ],
    licao: "A fidelidade nas relações comuns abre caminhos que não imaginamos.",
  },
  {
    slug: "ester",
    nome: "Ester",
    papel: "Rainha que salvou seu povo",
    livro: "Livro de Ester",
    resumo:
      "Judia tornada rainha da Pérsia que arriscou a vida para impedir o extermínio dos seus.",
    historia: [
      "Órfã criada pelo primo Mardoqueu, Ester foi escolhida rainha sem revelar sua origem. Quando o ministro Amã tramou matar todos os judeus, Mardoqueu a desafiou: \"quem sabe se não chegaste ao trono para uma hora como esta?\".",
      "Depois de jejum, ela se apresentou ao rei sem ser convocada, denunciou Amã e conseguiu a salvação do povo, lembrada na festa de Purim.",
    ],
    licao: "A posição que você ocupa pode ser missão, não privilégio.",
  },
  {
    slug: "maria",
    nome: "Maria de Nazaré",
    papel: "Mãe do Senhor",
    livro: "Evangelhos",
    resumo:
      "Jovem de Nazaré que disse sim ao anúncio do anjo e acompanhou Jesus da manjedoura à cruz.",
    historia: [
      "Ao ser saudada por Gabriel, respondeu: \"Faça-se em mim segundo a tua palavra\". Visitou a prima Isabel e cantou o Magnificat.",
      "Esteve em Belém, na fuga para o Egito, em Caná — onde disse \"fazei tudo o que Ele vos disser\" — e ao pé da cruz, onde recebeu a missão de mãe dos discípulos.",
    ],
    licao: "O sim a Deus é dito uma vez e sustentado a vida inteira.",
  },
  {
    slug: "pedro",
    nome: "Pedro",
    papel: "Pescador e primeiro Papa",
    livro: "Evangelhos, Atos",
    resumo:
      "Apóstolo impulsivo que negou Jesus três vezes, foi perdoado e tornou-se rocha da Igreja.",
    historia: [
      "Simão deixou as redes ao chamado de Jesus, que lhe deu o nome de Pedro (rocha) e as chaves do Reino. Na Paixão, negou conhecê-lo e chorou amargamente.",
      "O Ressuscitado o reconduziu à beira do lago: \"tu me amas? Apascenta as minhas ovelhas\". Em Pentecostes, pregou à multidão e liderou a Igreja nascente até o martírio em Roma.",
    ],
    licao: "O amor recoloca de pé quem a vergonha derrubou.",
  },
  {
    slug: "paulo",
    nome: "Paulo de Tarso",
    papel: "Apóstolo dos gentios",
    livro: "Atos, Cartas",
    resumo:
      "De perseguidor dos cristãos a maior missionário da Igreja primitiva. Escreveu treze cartas do Novo Testamento.",
    historia: [
      "Fariseu culto, aprovou a morte de Estêvão e caçava discípulos até ser derrubado por uma luz a caminho de Damasco: \"Saulo, por que me persegues?\".",
      "Batizado, percorreu o mundo greco-romano fundando comunidades, enfrentando prisões e naufrágios. Foi decapitado em Roma sob Nero.",
    ],
    licao: "Nenhum passado é grande demais para a graça reaproveitar.",
  },
];
