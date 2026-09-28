export type FilmeLumine = {
  titulo: string;
  tema: string;
  descricao: string;
  categoria: "Vida dos Santos" | "Nossa Senhora" | "Fé e espiritualidade";
};

/**
 * Vitrine de filmes da Lumine (streaming católico, lumine.tv). Não temos
 * como confirmar deep link por título — o site redireciona quem não é
 * assinante pra página geral —, então todo botão aponta pra lumine.tv.
 * A pessoa assiste de verdade lá dentro, com a assinatura dela.
 */
export const filmesLumine: FilmeLumine[] = [
  {
    titulo: "Padre Pio: O Santo de Pietrelcina",
    tema: "São Pio de Pietrelcina",
    descricao: "Na véspera de sua morte, Padre Pio recebe a visita de um monsenhor encarregado de investigá-lo.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Duas Coroas",
    tema: "São Maximiliano Kolbe",
    descricao: "A vida do frade franciscano que ofereceu a própria vida no lugar de um pai de família em Auschwitz.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Claret: O Santo de Todos",
    tema: "Santo Antônio Maria Claret",
    descricao: "A trajetória do fundador dos Missionários Claretianos, confessor de uma rainha e missionário incansável.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "O Céu Não Pode Esperar",
    tema: "Beato Carlo Acutis",
    descricao: "A curta e intensa vida do jovem que catalogou milagres eucarísticos e morreu aos 15 anos.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "A Canção de Bernadette",
    tema: "Santa Bernadette Soubirous",
    descricao: "A menina que viu Nossa Senhora em Lourdes e enfrentou a descrença ao seu redor.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Francisco",
    tema: "São Francisco de Assis",
    descricao: "A conversão do filho de um comerciante rico que escolheu viver o Evangelho na pobreza total.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Santo Antônio",
    tema: "Santo Antônio de Pádua",
    descricao: "A vida do pregador português que se tornou um dos santos mais queridos do mundo.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Amor e Misericórdia: Faustina",
    tema: "Santa Faustina Kowalska",
    descricao: "A religiosa polonesa que recebeu as revelações da Divina Misericórdia.",
    categoria: "Vida dos Santos",
  },
  {
    titulo: "Guadalupe: Mãe da Humanidade",
    tema: "Nossa Senhora de Guadalupe",
    descricao: "A aparição a São Juan Diego que mudou a evangelização das Américas.",
    categoria: "Nossa Senhora",
  },
  {
    titulo: "O Último Chamado de Maria",
    tema: "Nossa Senhora",
    descricao: "Um drama sobre fé, família e a intercessão de Maria na vida real das pessoas.",
    categoria: "Nossa Senhora",
  },
  {
    titulo: "Coração de Pai",
    tema: "São José",
    descricao: "Uma reflexão sobre a paternidade silenciosa e fiel de São José.",
    categoria: "Fé e espiritualidade",
  },
  {
    titulo: "São Miguel Arcanjo: O Anjo Maior",
    tema: "São Miguel Arcanjo",
    descricao: "Um documentário sobre o príncipe dos exércitos celestes e sua presença na tradição católica.",
    categoria: "Fé e espiritualidade",
  },
];

export const LUMINE_URL = "https://lumine.tv/";
