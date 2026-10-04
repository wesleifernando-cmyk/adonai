import { calendarioSantos, type TipoCelebracao } from "./calendario-santos";

export type Santo = {
  slug: string;
  nome: string;
  titulo: string;
  /** dia da memória litúrgica, formato "MM-DD" */
  festa: string;
  periodo: string;
  jovem: boolean;
  doutor: boolean;
  padroeiro?: string;
  resumo: string;
  historia: string[];
  frase: string;
  fonteFrase: string;
  /** arquivo em /public/santos/<slug>.jpg — preencher só quando houver imagem de uso livre */
  imagem?: string;
  /** crédito/atribuição da imagem (obrigatório quando houver imagem) */
  imagemCredito?: string;
};

/**
 * Acervo inicial de santos. Fatos de domínio público (biografias históricas).
 * Ampliar aos poucos; a curadoria dos textos precisa de revisão (ver README).
 */
export const santos: Santo[] = [
  {
    slug: "carlo-acutis",
    nome: "São Carlo Acutis",
    titulo: "O jovem da Eucaristia",
    festa: "10-12",
    periodo: "1991 – 2006",
    jovem: true,
    doutor: false,
    padroeiro: "Internet e jovens",
    resumo:
      "Adolescente italiano que usou a informática para catalogar milagres eucarísticos pelo mundo. Morreu aos 15 anos de leucemia, oferecendo o sofrimento pela Igreja e pelo Papa.",
    historia: [
      "Carlo nasceu em Londres em 1991 e cresceu em Milão. Desde a Primeira Comunhão, aos 7 anos, fazia questão de ir à missa todos os dias e passar um tempo diante do Santíssimo, que chamava de \"minha autoestrada para o Céu\".",
      "Habilidoso com computadores, montou sozinho um site reunindo os milagres eucarísticos reconhecidos pela Igreja. Ajudava colegas, defendia quem sofria bullying e cuidava de pessoas em situação de rua. Ao ser diagnosticado com leucemia, ofereceu tudo pelo Papa e pela Igreja. Foi beatificado em Assis em 2020 e canonizado pelo Papa Leão XIV em 7 de setembro de 2025, na Praça de São Pedro, ao lado de São Pier Giorgio Frassati — os dois apresentados pelo Papa como exemplos de santidade para os jovens.",
    ],
    frase: "Todos nascem como originais, mas muitos morrem como fotocópias.",
    fonteFrase: "Carlo Acutis",
  },
  {
    slug: "teresinha-de-lisieux",
    nome: "Santa Teresinha do Menino Jesus",
    titulo: "A santa do pequeno caminho",
    festa: "10-01",
    periodo: "1873 – 1897",
    jovem: true,
    doutor: true,
    padroeiro: "Missões e missionários",
    resumo:
      "Carmelita francesa que ensinou a santidade feita de pequenos gestos de amor. Morreu aos 24 anos e é Doutora da Igreja.",
    historia: [
      "Marie-Françoise-Thérèse Martin entrou no Carmelo de Lisieux aos 15 anos. Ali viveu escondida, sem grandes obras exteriores, mas com uma intensidade interior que descreveu na autobiografia \"História de uma Alma\".",
      "Seu \"pequeno caminho\" propõe confiar em Deus como uma criança e transformar cada tarefa comum em oferta de amor. Morreu de tuberculose aos 24 anos. Foi proclamada padroeira das missões e, em 1997, Doutora da Igreja.",
    ],
    frase: "Minha vocação é o amor.",
    fonteFrase: "História de uma Alma",
  },
  {
    slug: "domingos-savio",
    nome: "São Domingos Sávio",
    titulo: "Aluno de Dom Bosco",
    festa: "05-06",
    periodo: "1842 – 1857",
    jovem: true,
    doutor: false,
    resumo:
      "Estudante do oratório de Dom Bosco em Turim. Fez da frase \"antes morrer do que pecar\" o lema da sua curta vida. Morreu aos 14 anos.",
    historia: [
      "Domingos entrou aos 12 anos na escola de São João Bosco. Fundou entre os colegas a Companhia da Imaculada, grupo que se comprometia com a confissão frequente, a Comunhão e o cuidado com os alunos mais novos.",
      "Era conhecido pela alegria e pela firmeza diante do mal. Adoeceu e voltou para casa, onde morreu aos 14 anos. Foi canonizado em 1954, tornando-se um dos santos mais jovens não mártires.",
    ],
    frase: "Aqui nós fazemos a santidade consistir em estar sempre alegres.",
    fonteFrase: "São Domingos Sávio",
  },
  {
    slug: "maria-goretti",
    nome: "Santa Maria Goretti",
    titulo: "Mártir do perdão",
    festa: "07-06",
    periodo: "1890 – 1902",
    jovem: true,
    doutor: false,
    resumo:
      "Menina camponesa italiana morta aos 11 anos ao resistir a uma agressão. Antes de morrer, perdoou o agressor, que anos depois se converteu.",
    historia: [
      "Maria vivia com a família em Le Ferriere, ajudando a mãe viúva a criar os irmãos. Em julho de 1902 foi atacada por um vizinho e esfaqueada ao resistir.",
      "No hospital, perdoou explicitamente o agressor e morreu no dia seguinte. Alessandro Serenelli cumpriu pena, converteu-se depois de um sonho com Maria e chegou a testemunhar na causa de canonização, celebrada em 1950.",
    ],
    frase: "Sim, por amor de Jesus eu o perdoo.",
    fonteFrase: "Santa Maria Goretti",
  },
  {
    slug: "joana-darc",
    nome: "Santa Joana d'Arc",
    titulo: "A donzela de Orléans",
    festa: "05-30",
    periodo: "1412 – 1431",
    jovem: true,
    doutor: false,
    padroeiro: "França",
    resumo:
      "Camponesa francesa que, aos 17 anos, liderou tropas na Guerra dos Cem Anos. Foi queimada como herege aos 19 e reabilitada depois; canonizada em 1920.",
    historia: [
      "Joana dizia ouvir vozes de santos pedindo que ajudasse o rei da França. Convenceu a corte, participou da libertação de Orléans em 1429 e acompanhou a coroação de Carlos VII.",
      "Capturada pelos borguinhões e entregue aos ingleses, foi julgada num tribunal eclesiástico manipulado e condenada. Um novo processo, em 1456, anulou a sentença. A Igreja a canonizou em 1920.",
    ],
    frase: "Dos soldados a batalha; de Deus, a vitória.",
    fonteFrase: "atribuída a Joana d'Arc",
  },
  {
    slug: "francisco-de-assis",
    nome: "São Francisco de Assis",
    titulo: "O pobre de Assis",
    festa: "10-04",
    periodo: "1181 – 1226",
    jovem: false,
    doutor: false,
    padroeiro: "Ecologia e animais",
    resumo:
      "Filho de um comerciante rico que renunciou a tudo para viver o Evangelho na pobreza. Fundou a Ordem dos Frades Menores.",
    historia: [
      "Depois de uma juventude de festas e de uma experiência na guerra e na prisão, Francisco ouviu no crucifixo de São Damião o chamado a \"reparar a Igreja\". Devolveu ao pai até as roupas e passou a viver de esmolas, cuidando de leprosos.",
      "Reuniu companheiros, obteve a aprovação do Papa e pregou a paz por toda a Itália. Recebeu os estigmas em 1224 e compôs o \"Cântico das Criaturas\". Morreu em 1226 e foi canonizado dois anos depois.",
    ],
    frase: "Começai fazendo o necessário, depois o possível, e de repente estareis fazendo o impossível.",
    fonteFrase: "atribuída a São Francisco",
  },
  {
    slug: "agostinho-de-hipona",
    nome: "Santo Agostinho de Hipona",
    titulo: "Doutor da Graça",
    festa: "08-28",
    periodo: "354 – 430",
    jovem: false,
    doutor: true,
    resumo:
      "Bispo no norte da África, autor das \"Confissões\" e de \"A Cidade de Deus\". Sua conversão, aos 31 anos, é um dos relatos mais lidos da história cristã.",
    historia: [
      "Nascido em Tagaste, Agostinho foi professor de retórica e passou anos buscando a verdade no maniqueísmo e na filosofia. As orações da mãe, Santa Mônica, e a pregação de Santo Ambrósio em Milão o levaram ao batismo em 387.",
      "Voltou para a África, tornou-se bispo de Hipona e escreveu tratados que moldaram a teologia ocidental sobre a graça, a Trindade e a Igreja. É Doutor da Igreja.",
    ],
    frase: "Tarde te amei, ó Beleza tão antiga e tão nova, tarde te amei.",
    fonteFrase: "Confissões, Livro X",
  },
  {
    slug: "tomas-de-aquino",
    nome: "São Tomás de Aquino",
    titulo: "Doutor Angélico",
    festa: "01-28",
    periodo: "1225 – 1274",
    jovem: false,
    doutor: true,
    padroeiro: "Estudantes e universidades",
    resumo:
      "Frade dominicano, autor da \"Suma Teológica\". Uniu fé e razão como poucos e continua sendo referência no ensino da Igreja.",
    historia: [
      "De família nobre, Tomás entrou para os dominicanos contra a vontade dos parentes, que chegaram a mantê-lo preso por um ano. Estudou com Santo Alberto Magno e ensinou em Paris e na Itália.",
      "Escreveu a \"Suma Teológica\" para expor de forma ordenada toda a doutrina cristã. Perto do fim da vida teve uma experiência mística e disse que tudo o que escrevera lhe parecia \"palha\". Morreu em 1274; é Doutor da Igreja.",
    ],
    frase: "Nada se pode amar se antes não for conhecido.",
    fonteFrase: "São Tomás de Aquino",
  },
  {
    slug: "teresa-davila",
    nome: "Santa Teresa d'Ávila",
    titulo: "Doutora da oração",
    festa: "10-15",
    periodo: "1515 – 1582",
    jovem: false,
    doutor: true,
    resumo:
      "Carmelita espanhola, reformadora da Ordem e mestra da vida interior. Autora do \"Castelo Interior\" e do \"Caminho de Perfeição\".",
    historia: [
      "Depois de quase vinte anos de vida religiosa morna, Teresa viveu uma conversão profunda diante de uma imagem de Cristo. Passou a fundar conventos de vida mais pobre e recolhida, os Carmelitas Descalços, com o apoio de São João da Cruz.",
      "Enfrentou doenças, suspeitas da Inquisição e resistência interna, sempre com humor e realismo. Seus livros sobre a oração são clássicos. Foi a primeira mulher declarada Doutora da Igreja, em 1970.",
    ],
    frase: "Nada te perturbe, nada te espante; quem a Deus tem, nada lhe falta.",
    fonteFrase: "Poesia de Santa Teresa",
  },
  {
    slug: "joao-bosco",
    nome: "São João Bosco",
    titulo: "Pai e mestre da juventude",
    festa: "01-31",
    periodo: "1815 – 1888",
    jovem: false,
    doutor: false,
    padroeiro: "Aprendizes e editores católicos",
    resumo:
      "Padre italiano que dedicou a vida aos meninos pobres de Turim. Fundou os Salesianos e o \"sistema preventivo\" de educação.",
    historia: [
      "Órfão de pai aos dois anos, Dom Bosco cresceu no campo e teve aos nove um sonho que marcaria sua missão: educar jovens com \"razão, religião e amor\", não com castigos.",
      "Ordenado padre, reuniu meninos aprendizes em oratórios com escola, oficina e lazer. Fundou a Sociedade Salesiana e, com Santa Maria Domingas Mazzarello, as Filhas de Maria Auxiliadora. Foi canonizado em 1934.",
    ],
    frase: "Basta que sejais jovens para que eu vos ame muito.",
    fonteFrase: "São João Bosco",
  },
  {
    slug: "padre-pio",
    nome: "São Pio de Pietrelcina",
    titulo: "O frade dos estigmas",
    festa: "09-23",
    periodo: "1887 – 1968",
    jovem: false,
    doutor: false,
    resumo:
      "Frade capuchinho do sul da Itália que carregou os estigmas por cinquenta anos e passava horas no confessionário. Fundou uma grande casa de saúde para os pobres.",
    historia: [
      "Francesco Forgione entrou para os capuchinhos aos 15 anos, tomando o nome de Pio. Em 1918 recebeu as chagas visíveis da Paixão, que permaneceram até o fim da vida e foram alvo de longas investigações da Igreja.",
      "Em San Giovanni Rotondo, atendia filas de penitentes e promoveu grupos de oração. Inaugurou em 1956 a Casa Alívio do Sofrimento. Foi canonizado em 2002 por João Paulo II.",
    ],
    frase: "Reza, espera e não te preocupes.",
    fonteFrase: "São Pio de Pietrelcina",
  },
  {
    slug: "jose-de-nazare",
    nome: "São José",
    titulo: "Esposo de Maria, guardião do Redentor",
    festa: "03-19",
    periodo: "século I",
    jovem: false,
    doutor: false,
    padroeiro: "Igreja universal, trabalhadores e boa morte",
    resumo:
      "Carpinteiro de Nazaré, esposo da Virgem Maria e pai adotivo de Jesus. Os Evangelhos não registram uma palavra sua, apenas sua obediência.",
    historia: [
      "José aparece em Mateus e Lucas como \"homem justo\". Aceita o mistério da encarnação, dá nome a Jesus, o protege na fuga para o Egito e o educa no trabalho e na fé de Israel.",
      "A tradição o venera como padroeiro da Igreja e da boa morte, por ter partido, segundo a piedade cristã, na companhia de Jesus e Maria. Pio IX o declarou patrono da Igreja universal em 1870.",
    ],
    frase: "Fez tudo como o anjo do Senhor lhe havia ordenado.",
    fonteFrase: "Mateus 1,24",
  },
  {
    slug: "rita-de-cassia",
    nome: "Santa Rita de Cássia",
    titulo: "Santa das causas impossíveis",
    festa: "05-22",
    periodo: "1381 – 1457",
    jovem: false,
    doutor: false,
    padroeiro: "Causas difíceis e desesperadas",
    resumo:
      "Esposa, mãe, viúva e por fim religiosa agostiniana na Úmbria. Sua vida atravessou violência familiar, luto e reconciliação.",
    historia: [
      "Casada jovem com um homem violento, Rita rezou por anos pela conversão dele, que acabou assassinado. Perdoou os culpados e pediu a Deus que os filhos não vingassem o pai.",
      "Viúva e sem filhos, entrou no mosteiro de Cássia. Recebeu na testa uma ferida semelhante a um espinho da coroa de Cristo, que a acompanhou até a morte. Foi canonizada em 1900.",
    ],
    frase: "A quem confia em Deus, nada é impossível.",
    fonteFrase: "tradição de Santa Rita",
  },
  {
    slug: "jeronimo",
    nome: "São Jerônimo",
    titulo: "Doutor e tradutor das Escrituras",
    festa: "09-30",
    periodo: "347 – 420",
    jovem: false,
    doutor: true,
    padroeiro: "Biblistas e tradutores",
    resumo:
      "Monge e estudioso que traduziu a Bíblia para o latim — a Vulgata — a partir dos originais hebraico e grego. Viveu seus últimos anos em Belém.",
    historia: [
      "Formado em Roma, Jerônimo aprendeu hebraico com rabinos e dedicou décadas ao estudo do texto sagrado. A pedido do Papa Dâmaso, revisou e traduziu as Escrituras, produzindo a versão que a Igreja latina usaria por mais de mil anos.",
      "De temperamento forte, trocou cartas ásperas com adversários, mas nunca deixou o trabalho com a Palavra. Sua frase sobre a ignorância das Escrituras é citada até hoje pelo Magistério.",
    ],
    frase: "Ignorar as Escrituras é ignorar a Cristo.",
    fonteFrase: "Comentário sobre Isaías",
  },
  {
    slug: "cecilia",
    nome: "Santa Cecília",
    titulo: "Padroeira dos músicos",
    festa: "11-22",
    periodo: "século II ou III",
    jovem: true,
    doutor: false,
    padroeiro: "Música sacra e músicos",
    resumo:
      "Jovem mártir romana. A tradição diz que, no dia do casamento, \"cantava a Deus no coração\" — de onde vem seu patrocínio sobre a música.",
    historia: [
      "Segundo as atas antigas, Cecília era cristã e converteu o marido, Valeriano, e o cunhado, que também foram martirizados. Distribuía seus bens aos pobres de Roma.",
      "Condenada à morte, sobreviveu três dias após os golpes, tempo em que confirmou os irmãos na fé. Sua memória está entre as mais antigas do calendário romano.",
    ],
    frase: "Cantando ao Senhor no seu coração.",
    fonteFrase: "Antífona da festa de Santa Cecília",
  },
];

export type SantoDoDia = {
  nome: string;
  /** Texto curto do grau da celebração (ex.: "Memória", "Festa") */
  grau: string;
  /** Presente quando o santo tem página completa no acervo */
  santo?: Santo;
  /** Outras celebrações do mesmo dia */
  tambem: string[];
};

const GRAU: Record<TipoCelebracao, string> = {
  solenidade: "Solenidade",
  festa: "Festa",
  memoria: "Memória",
  facultativa: "Memória facultativa",
  martirologio: "Lembrado hoje"
};

const semAcento = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const PALAVRAS_COMUNS = new Set(["santa", "santo", "sao", "nossa", "senhora", "beato", "beata", "papa", "martir", "virgem", "bispo"]);

function mesmoSanto(nomeCalendario: string, s: Santo): boolean {
  const cal = new Set(semAcento(nomeCalendario).match(/[a-z]{4,}/g) ?? []);
  return (semAcento(s.nome).match(/[a-z]{4,}/g) ?? []).some((w) => !PALAVRAS_COMUNS.has(w) && cal.has(w));
}

/** O santo (ou celebração) do dia, a partir do calendário litúrgico — não mais um sorteio. */
export function santoDoDia(d = new Date()): SantoDoDia {
  const mmdd = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const [principal, ...resto] = calendarioSantos[mmdd] ?? [{ nome: "Todos os santos e santas de Deus", tipo: "martirologio" as const }];
  return {
    nome: principal.nome,
    grau: GRAU[principal.tipo],
    santo: santos.find((s) => s.festa === mmdd && mesmoSanto(principal.nome, s)),
    tambem: resto.map((r) => r.nome)
  };
}

export function santoJovemDoDia(d = new Date()): Santo {
  const jovens = santos.filter((s) => s.jovem);
  return jovens[dayIndex(d, jovens.length)];
}

function dayIndex(d: Date, len: number): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const day = Math.floor((d.getTime() - start.getTime()) / 86_400_000);
  return day % len;
}
