export type LivroBiblico = {
  slug: string;
  nome: string;
  abrev: string;
  capitulos: number;
  grupo: Grupo;
};

export type Grupo =
  | "Pentateuco"
  | "Históricos"
  | "Sapienciais"
  | "Proféticos"
  | "Evangelhos"
  | "Atos"
  | "Cartas"
  | "Apocalipse";

/**
 * Cânon católico (73 livros). Por ora só a estrutura de navegação —
 * o texto de cada capítulo virá de uma fonte de tradução definida
 * (ver README: direitos autorais das traduções em português).
 */
export const antigoTestamento: LivroBiblico[] = [
  { slug: "genesis", nome: "Gênesis", abrev: "Gn", capitulos: 50, grupo: "Pentateuco" },
  { slug: "exodo", nome: "Êxodo", abrev: "Ex", capitulos: 40, grupo: "Pentateuco" },
  { slug: "levitico", nome: "Levítico", abrev: "Lv", capitulos: 27, grupo: "Pentateuco" },
  { slug: "numeros", nome: "Números", abrev: "Nm", capitulos: 36, grupo: "Pentateuco" },
  { slug: "deuteronomio", nome: "Deuteronômio", abrev: "Dt", capitulos: 34, grupo: "Pentateuco" },
  { slug: "josue", nome: "Josué", abrev: "Js", capitulos: 24, grupo: "Históricos" },
  { slug: "juizes", nome: "Juízes", abrev: "Jz", capitulos: 21, grupo: "Históricos" },
  { slug: "rute", nome: "Rute", abrev: "Rt", capitulos: 4, grupo: "Históricos" },
  { slug: "1-samuel", nome: "1 Samuel", abrev: "1Sm", capitulos: 31, grupo: "Históricos" },
  { slug: "2-samuel", nome: "2 Samuel", abrev: "2Sm", capitulos: 24, grupo: "Históricos" },
  { slug: "1-reis", nome: "1 Reis", abrev: "1Rs", capitulos: 22, grupo: "Históricos" },
  { slug: "2-reis", nome: "2 Reis", abrev: "2Rs", capitulos: 25, grupo: "Históricos" },
  { slug: "1-cronicas", nome: "1 Crônicas", abrev: "1Cr", capitulos: 29, grupo: "Históricos" },
  { slug: "2-cronicas", nome: "2 Crônicas", abrev: "2Cr", capitulos: 36, grupo: "Históricos" },
  { slug: "esdras", nome: "Esdras", abrev: "Esd", capitulos: 10, grupo: "Históricos" },
  { slug: "neemias", nome: "Neemias", abrev: "Ne", capitulos: 13, grupo: "Históricos" },
  { slug: "tobias", nome: "Tobias", abrev: "Tb", capitulos: 14, grupo: "Históricos" },
  { slug: "judite", nome: "Judite", abrev: "Jt", capitulos: 16, grupo: "Históricos" },
  { slug: "ester", nome: "Ester", abrev: "Est", capitulos: 10, grupo: "Históricos" },
  { slug: "1-macabeus", nome: "1 Macabeus", abrev: "1Mac", capitulos: 16, grupo: "Históricos" },
  { slug: "2-macabeus", nome: "2 Macabeus", abrev: "2Mac", capitulos: 15, grupo: "Históricos" },
  { slug: "jo", nome: "Jó", abrev: "Jó", capitulos: 42, grupo: "Sapienciais" },
  { slug: "salmos", nome: "Salmos", abrev: "Sl", capitulos: 150, grupo: "Sapienciais" },
  { slug: "proverbios", nome: "Provérbios", abrev: "Pr", capitulos: 31, grupo: "Sapienciais" },
  { slug: "eclesiastes", nome: "Eclesiastes", abrev: "Ecl", capitulos: 12, grupo: "Sapienciais" },
  { slug: "cantico", nome: "Cântico dos Cânticos", abrev: "Ct", capitulos: 8, grupo: "Sapienciais" },
  { slug: "sabedoria", nome: "Sabedoria", abrev: "Sb", capitulos: 19, grupo: "Sapienciais" },
  { slug: "eclesiastico", nome: "Eclesiástico (Sirácida)", abrev: "Eclo", capitulos: 51, grupo: "Sapienciais" },
  { slug: "isaias", nome: "Isaías", abrev: "Is", capitulos: 66, grupo: "Proféticos" },
  { slug: "jeremias", nome: "Jeremias", abrev: "Jr", capitulos: 52, grupo: "Proféticos" },
  { slug: "lamentacoes", nome: "Lamentações", abrev: "Lm", capitulos: 5, grupo: "Proféticos" },
  { slug: "baruc", nome: "Baruc", abrev: "Br", capitulos: 6, grupo: "Proféticos" },
  { slug: "ezequiel", nome: "Ezequiel", abrev: "Ez", capitulos: 48, grupo: "Proféticos" },
  { slug: "daniel", nome: "Daniel", abrev: "Dn", capitulos: 14, grupo: "Proféticos" },
  { slug: "oseias", nome: "Oseias", abrev: "Os", capitulos: 14, grupo: "Proféticos" },
  { slug: "joel", nome: "Joel", abrev: "Jl", capitulos: 4, grupo: "Proféticos" },
  { slug: "amos", nome: "Amós", abrev: "Am", capitulos: 9, grupo: "Proféticos" },
  { slug: "abdias", nome: "Abdias", abrev: "Ab", capitulos: 1, grupo: "Proféticos" },
  { slug: "jonas", nome: "Jonas", abrev: "Jn", capitulos: 4, grupo: "Proféticos" },
  { slug: "miqueias", nome: "Miqueias", abrev: "Mq", capitulos: 7, grupo: "Proféticos" },
  { slug: "naum", nome: "Naum", abrev: "Na", capitulos: 3, grupo: "Proféticos" },
  { slug: "habacuc", nome: "Habacuc", abrev: "Hab", capitulos: 3, grupo: "Proféticos" },
  { slug: "sofonias", nome: "Sofonias", abrev: "Sf", capitulos: 3, grupo: "Proféticos" },
  { slug: "ageu", nome: "Ageu", abrev: "Ag", capitulos: 2, grupo: "Proféticos" },
  { slug: "zacarias", nome: "Zacarias", abrev: "Zc", capitulos: 14, grupo: "Proféticos" },
  { slug: "malaquias", nome: "Malaquias", abrev: "Ml", capitulos: 3, grupo: "Proféticos" },
];

export const novoTestamento: LivroBiblico[] = [
  { slug: "mateus", nome: "Mateus", abrev: "Mt", capitulos: 28, grupo: "Evangelhos" },
  { slug: "marcos", nome: "Marcos", abrev: "Mc", capitulos: 16, grupo: "Evangelhos" },
  { slug: "lucas", nome: "Lucas", abrev: "Lc", capitulos: 24, grupo: "Evangelhos" },
  { slug: "joao", nome: "João", abrev: "Jo", capitulos: 21, grupo: "Evangelhos" },
  { slug: "atos", nome: "Atos dos Apóstolos", abrev: "At", capitulos: 28, grupo: "Atos" },
  { slug: "romanos", nome: "Romanos", abrev: "Rm", capitulos: 16, grupo: "Cartas" },
  { slug: "1-corintios", nome: "1 Coríntios", abrev: "1Cor", capitulos: 16, grupo: "Cartas" },
  { slug: "2-corintios", nome: "2 Coríntios", abrev: "2Cor", capitulos: 13, grupo: "Cartas" },
  { slug: "galatas", nome: "Gálatas", abrev: "Gl", capitulos: 6, grupo: "Cartas" },
  { slug: "efesios", nome: "Efésios", abrev: "Ef", capitulos: 6, grupo: "Cartas" },
  { slug: "filipenses", nome: "Filipenses", abrev: "Fl", capitulos: 4, grupo: "Cartas" },
  { slug: "colossenses", nome: "Colossenses", abrev: "Cl", capitulos: 4, grupo: "Cartas" },
  { slug: "1-tessalonicenses", nome: "1 Tessalonicenses", abrev: "1Ts", capitulos: 5, grupo: "Cartas" },
  { slug: "2-tessalonicenses", nome: "2 Tessalonicenses", abrev: "2Ts", capitulos: 3, grupo: "Cartas" },
  { slug: "1-timoteo", nome: "1 Timóteo", abrev: "1Tm", capitulos: 6, grupo: "Cartas" },
  { slug: "2-timoteo", nome: "2 Timóteo", abrev: "2Tm", capitulos: 4, grupo: "Cartas" },
  { slug: "tito", nome: "Tito", abrev: "Tt", capitulos: 3, grupo: "Cartas" },
  { slug: "filemon", nome: "Filêmon", abrev: "Fm", capitulos: 1, grupo: "Cartas" },
  { slug: "hebreus", nome: "Hebreus", abrev: "Hb", capitulos: 13, grupo: "Cartas" },
  { slug: "tiago", nome: "Tiago", abrev: "Tg", capitulos: 5, grupo: "Cartas" },
  { slug: "1-pedro", nome: "1 Pedro", abrev: "1Pd", capitulos: 5, grupo: "Cartas" },
  { slug: "2-pedro", nome: "2 Pedro", abrev: "2Pd", capitulos: 3, grupo: "Cartas" },
  { slug: "1-joao", nome: "1 João", abrev: "1Jo", capitulos: 5, grupo: "Cartas" },
  { slug: "2-joao", nome: "2 João", abrev: "2Jo", capitulos: 1, grupo: "Cartas" },
  { slug: "3-joao", nome: "3 João", abrev: "3Jo", capitulos: 1, grupo: "Cartas" },
  { slug: "judas", nome: "Judas", abrev: "Jd", capitulos: 1, grupo: "Cartas" },
  { slug: "apocalipse", nome: "Apocalipse", abrev: "Ap", capitulos: 22, grupo: "Apocalipse" },
];

const TODOS_LIVROS = [...antigoTestamento, ...novoTestamento];

export function acharLivro(slug: string): LivroBiblico | undefined {
  return TODOS_LIVROS.find((l) => l.slug === slug);
}

export function livroVizinho(slug: string, dir: 1 | -1): LivroBiblico | undefined {
  const i = TODOS_LIVROS.findIndex((l) => l.slug === slug);
  return i < 0 ? undefined : TODOS_LIVROS[i + dir];
}
