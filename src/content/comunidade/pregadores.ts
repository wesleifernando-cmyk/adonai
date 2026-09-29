export type VideoPregacao = {
  titulo: string;
  youtubeId: string;
  data?: string;
  /** quando o vídeo específico vem de um canal diferente do canalNome do pregador
   *  (ex.: um canal que reposta a pregação) — dá crédito aos dois. */
  canalOrigem?: string;
};

export type Pregador = {
  slug: string;
  nome: string;
  descricao: string;
  canalNome: string;
  canalUrl?: string;
  instagramUrl?: string;
  videos: VideoPregacao[];
};

/**
 * Pregadores convidados. Todo o conteúdo é embutido direto do YouTube
 * (nada baixado ou reidesignado) — o crédito, a visualização e a receita
 * de publicidade continuam sendo do canal original de cada um.
 * Para acrescentar mais: pedir o link do YouTube e extrair o ID do vídeo
 * (a parte depois de "v=" na URL).
 */
export const pregadores: Pregador[] = [
  {
    slug: "moises-rocha",
    nome: "Moisés Rocha",
    descricao: "Fundador da Comunidade Filhos de João Batista, em 2002.",
    canalNome: "Comunidade Filhos de João Batista",
    canalUrl: "https://www.youtube.com/channel/UClNauiXYCExotB5HCcVdATw",
    videos: [
      { titulo: "Não seja um católico que não conhece Jesus!", youtubeId: "JfGeUPayysY" },
      { titulo: "Os teus passos serão guardados pelos Anjos!", youtubeId: "Nv0AFNxY6FE", data: "26/09/2024" },
      { titulo: "As 4 funções do Espírito Santo em sua vida", youtubeId: "6YGpiAgHImM" },
      { titulo: "Abraão: a dor da espera e do sacrifício", youtubeId: "mT07GQmTryM" },
      { titulo: "Mulheres empoderadas por Deus", youtubeId: "3WsThADK_-o" },
      { titulo: "Sabemos tudo mas não temos coragem (Retiro para servos)", youtubeId: "JmWLx_Y8YEw" },
      { titulo: "Pacificar, perseverar e permanecer em Cristo", youtubeId: "gcgSlnGyCPA" },
      { titulo: "Uma vida que reflete Deus!", youtubeId: "LqAuVr30lVg" },
      { titulo: "Summer Beats 20 anos // Interlagos", youtubeId: "LAWlCtjJHns" },
      { titulo: "João Batista reconduzirá o coração dos pais aos filhos", youtubeId: "5UasNTZU6P4" },
      { titulo: "Que Ele cresça e eu diminua", youtubeId: "-k3wL8nNclk" },
      { titulo: "O profetismo doméstico passa pela vivência da verdade", youtubeId: "pFjwmpMkM4A" },
      { titulo: "A Virgem Maria e a sua maternidade universal", youtubeId: "mJWDAM-2A3s" },
      { titulo: "O poder dos pais que oram e os níveis de espiritualidade", youtubeId: "7nmRl1QNZOM" },
      { titulo: "Maria: a primeira missionária que nos ensina a levar Cristo ao mundo", youtubeId: "m3DXEeKPuTo" },
      { titulo: "Vocação ao Laicato: um discipulado que não espera!", youtubeId: "w6NVC3fS3_c" },
      { titulo: "A vocação da família: um chamado de amor!", youtubeId: "DYcTIdeqQTg" },
      { titulo: "Família, escola de amor e instrumento de salvação", youtubeId: "aZ2ayP8BcNM" },
      { titulo: "A família e as mudanças dos tempos", youtubeId: "eEbOxUhseWU" },
      { titulo: "Pescadores de famílias!", youtubeId: "Jhw2FN_tkw8" },
      { titulo: "Refúgio em Deus", youtubeId: "_CKvgA5xcSc" },
      { titulo: "Eucaristia, Sacramento de Amor! (PHN)", youtubeId: "jXf_u5Lh-iU" },
      { titulo: "A conspiração contra o profeta", youtubeId: "dIIZksI4nOo" },
      { titulo: "Maridos, amem as suas esposas!", youtubeId: "DYj9TPFkfu8" },
    ],
  },
  {
    slug: "padre-leo",
    nome: "Padre Léo",
    descricao:
      "Padre Léo Tarcísio Gonçalves Pereira, fundador da Comunidade Bethânia, marcou gerações pregando na Canção Nova com humor e acolhida aos feridos.",
    canalNome: "Padre Léo Pregações",
    canalUrl: "https://www.youtube.com/@padreleopregacoes",
    videos: [
      { titulo: "Fechamento Espiritual | Onde buscar a Verdadeira Paz", youtubeId: "dpjp-1u9vL0" },
      { titulo: "Curando de nossas Lepras", youtubeId: "1jD9pEPWgVI" },
      { titulo: "É preciso dizer não a este mundo", youtubeId: "gdgLatsI3ds" },
      { titulo: "Pregação com Padre Léo — Obra de Maria", youtubeId: "W40hHmZpjmU" },
      { titulo: "A história do Padre Léo", youtubeId: "DyAwpsFZHvc" },
      { titulo: "Canalize seus desejos para Deus — o segredo para vencer o pecado", youtubeId: "DBFg9pq5G1Y" },
      { titulo: "Rezando a vida", youtubeId: "HUgXxs_ldV8" },
      { titulo: "Deus nos chama à vida", youtubeId: "9HeWywIR15k" },
      { titulo: "Apóstolos para as famílias", youtubeId: "JrLmEBvlUNQ" },
      { titulo: "Ministrar a alegria", youtubeId: "OKrlulhzBPE" },
    ],
  },
  {
    slug: "charles-vieira",
    nome: "Charles Vieira",
    descricao:
      "Pregador católico, conhecido por pregações de fogo missionário e por uma formação completa sobre o livro Castelo Interior, de Santa Teresa d'Ávila.",
    canalNome: "Charles Vieira",
    canalUrl: "https://www.youtube.com/channel/UCbf9BVyvbrpcZZvaHoXa-Tg",
    videos: [
      { titulo: "Máquina de ganhar almas", youtubeId: "Oeb6cYwOrrw" },
      { titulo: "Melodia do Martírio", youtubeId: "9BjeyWF1saA" },
      { titulo: "Castelo Interior — Primeiras Moradas", youtubeId: "pY0SB6Zn_Qk" },
      { titulo: "Castelo Interior — Segundas Moradas", youtubeId: "8tnqWFFvxdc" },
      { titulo: "Castelo Interior — Terceiras Moradas", youtubeId: "tROvNTR2dgs" },
      { titulo: "Castelo Interior — Quartas Moradas", youtubeId: "JoKMVYFoNuQ" },
      { titulo: "Castelo Interior — Quintas Moradas", youtubeId: "7XmK4VusD8Q" },
      { titulo: "Castelo Interior — Sextas Moradas", youtubeId: "rhQmVgcYTmc" },
      { titulo: "Castelo Interior — Sétimas Moradas", youtubeId: "BL1F43J2yRA" },
    ],
  },
  {
    slug: "jonas-abib",
    nome: "Monsenhor Jonas Abib",
    descricao:
      "Fundador da Comunidade Canção Nova (1936–2022). Suas pregações moldaram o carisma da renovação carismática no Brasil.",
    canalNome: "Canção Nova",
    canalUrl: "https://padrejonas.cancaonova.com/",
    videos: [
      { titulo: "Acontecerá nos últimos dias", youtubeId: "oOBF0CsDi30", data: "14/10/2001" },
      { titulo: "Não te atormentes com a tristeza", youtubeId: "9rOyquFINTs" },
      { titulo: "A estratégia do inimigo", youtubeId: "_HX4xISjogs", data: "05/02/2005" },
      { titulo: "O que é de Deus acontece", youtubeId: "r7iK_uy6pdQ", data: "26/07/2017" },
      { titulo: "Cura e salvação para os nossos antepassados", youtubeId: "5VIEr4YO9wA", data: "17/12/1998" },
      { titulo: "Uma história de fé", youtubeId: "6kmb8aK1mV8" },
    ],
  },
  {
    slug: "phn",
    nome: "PHN — Por Hoje Não",
    descricao:
      "Um dos maiores encontros de evangelização de jovens do Brasil, da Comunidade Canção Nova, em Cachoeira Paulista (Vale do Paraíba). Reúne vários pregadores a cada edição.",
    canalNome: "Canção Nova",
    canalUrl: "https://eventos.cancaonova.com/phn-2026/",
    videos: [
      { titulo: "Eucaristia, Sacramento de Amor! — Moisés Rocha", youtubeId: "jXf_u5Lh-iU", data: "PHN 2026" },
      { titulo: "Oração ao Ritmo da Vida — Pe. Renné Viana", youtubeId: "q7UjZJBnEJk", data: "11/07/2026" },
      { titulo: "Homilia da Santa Missa — Pe. Wagner Ferreira", youtubeId: "j5lOWEYd1HI", data: "12/07/2026" },
    ],
  },
  {
    slug: "gloria-polo",
    nome: "Glória Polo",
    descricao:
      "Dentista colombiana que, após ser atingida por um raio em 1995, relata ter tido uma experiência de quase morte que mudou radicalmente sua vida. Seu testemunho é um dos mais conhecidos do mundo católico.",
    canalNome: "diversos canais católicos",
    videos: [
      { titulo: "Testemunho completo (dublado em português)", youtubeId: "q1cBBpXzWwk" },
      { titulo: "Uma segunda oportunidade", youtubeId: "IMSDLrSTdbo", data: "09/07/2009" },
      { titulo: "Testemunho completo em evento fechado, sem cortes", youtubeId: "hVzUmA9_yyM" },
    ],
  },
  {
    slug: "paulo-ricardo",
    nome: "Padre Paulo Ricardo",
    descricao: "Fundador da Escola da Fé, um dos maiores projetos de formação católica do Brasil.",
    canalNome: "Padre Paulo Ricardo",
    canalUrl: "https://www.youtube.com/@padrepauloricardo",
    videos: [
      { titulo: "Aprenda a rezar o Terço", youtubeId: "fSIr2iftPUo" },
      { titulo: "Como fazer um bom exame de consciência para se confessar?", youtubeId: "duhmYewFyS4", data: "5 anos" },
      { titulo: "Escola da Fé — Sobre a sanação radical", youtubeId: "gKf4wxaXvNY", data: "13/06/2013" },
    ],
  },
  {
    slug: "fabio-de-melo",
    nome: "Padre Fábio de Melo",
    descricao: "Padre, escritor e cantor. Apresenta o programa Direção Espiritual, na Canção Nova.",
    canalNome: "Canção Nova Play",
    canalUrl: "https://www.youtube.com/@cancaonovaplay",
    videos: [
      { titulo: "Depois da verdade, o Senhor renova todas as coisas", youtubeId: "U2ibtFCRSTo", data: "16/08/2026" },
      { titulo: "Direção Espiritual — 24/06/2026", youtubeId: "ixNG0Hr7BJI" },
      { titulo: "Direção Espiritual — 03/06/2026", youtubeId: "GcUxz_QTpHw" },
      { titulo: "Direção Espiritual — Episódio 16", youtubeId: "sOFjoCD76a4", data: "20/11/2024" },
      { titulo: "Direção Espiritual — Episódio 14", youtubeId: "TzOuir9Li1c", data: "06/11/2024" },
      { titulo: "Direção Espiritual — Episódio 05", youtubeId: "1LGszh8xIL0", data: "04/09/2024" },
      { titulo: "Direção Espiritual — 15/05/2019", youtubeId: "UxwJyQCf3v4" },
      { titulo: "Direção Espiritual 2025", youtubeId: "KixhjIjUK_g" },
    ],
  },
  {
    slug: "anderson-reis",
    nome: "Anderson Reis",
    descricao:
      "Pregador e missionário católico há mais de 20 anos. Começa aqui pelo tríduo sobre Céu, Inferno e Purgatório.",
    canalNome: "Anderson Reis Oficial",
    canalUrl: "https://www.youtube.com/channel/UCujutKwW-uS5t1wPattHnfA",
    instagramUrl: "https://www.instagram.com/andersonpregador/",
    videos: [
      {
        titulo: "Tríduo — Céu: Maria, porta do Céu",
        youtubeId: "MORhl7eU2Vs",
        canalOrigem: "Alegrai-vos no Senhor",
      },
      {
        titulo: "Tríduo — Inferno: O Inferno Existe",
        youtubeId: "Oja9uolOuOE",
        canalOrigem: "Alegrai-vos no Senhor",
      },
      {
        titulo: "Tríduo — Purgatório, última misericórdia de Deus (parte 1)",
        youtubeId: "1snNJlJe83Q",
        canalOrigem: "Alegrai-vos no Senhor",
      },
      {
        titulo: "Tríduo — Purgatório, última misericórdia de Deus (parte 2)",
        youtubeId: "PCOwrvWagy0",
        canalOrigem: "Alegrai-vos no Senhor",
      },
      { titulo: "Maria, terror dos demônios", youtubeId: "24IaM4zwBos" },
      { titulo: "Alma Missionária", youtubeId: "CauXpCqO7bM" },
      { titulo: "Combate Espiritual", youtubeId: "R7dp-Q65bX0" },
      { titulo: "O amor não é amado", youtubeId: "VI8NzTOhpIw", data: "07/02/2021" },
    ],
  },
];

export function acharPregador(slug: string): Pregador | undefined {
  return pregadores.find((p) => p.slug === slug);
}
