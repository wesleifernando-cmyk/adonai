// Banco de perguntas de Bíblia escritas à mão (fatos simples e seguros),
// misturadas com as geradas pela IA. Formato: [pergunta, [opções], índice da certa, explicação].
// Linguagem simples, pra qualquer jovem conseguir responder.
const B = [
  // --- Bíblia em geral: livros e cânon
  ["Quantos livros tem a Bíblia católica?", ["66", "73", "72", "80"], 1, "A Bíblia católica tem 73 livros: 46 no Antigo Testamento e 27 no Novo."],
  ["Quantos livros tem a Bíblia protestante?", ["66", "73", "70", "60"], 0, "As Bíblias protestantes têm 66 livros: 39 no Antigo Testamento e 27 no Novo."],
  ["Quantos livros tem o Antigo Testamento na Bíblia católica?", ["39", "27", "46", "50"], 2, "São 46 livros no Antigo Testamento católico (os protestantes aceitam 39)."],
  ["Quantos livros tem o Novo Testamento?", ["27", "21", "46", "33"], 0, "O Novo Testamento tem 27 livros, tanto na Bíblia católica quanto na protestante."],
  ["Qual destes livros está na Bíblia católica, mas não na protestante?", ["Rute", "Macabeus", "Ester", "Jó"], 1, "Os livros de Macabeus fazem parte dos deuterocanônicos, aceitos pela Igreja Católica."],
  ["Qual destes livros é um dos deuterocanônicos, presentes só na Bíblia católica?", ["Tobias", "Neemias", "Jonas", "Amós"], 0, "Tobias, Judite, Sabedoria, Eclesiástico (Sirácida), Baruc e 1 e 2 Macabeus são deuterocanônicos."],
  ["Qual é o primeiro livro da Bíblia?", ["Êxodo", "Gênesis", "Salmos", "Mateus"], 1, "A Bíblia começa com o Gênesis, o livro da criação."],
  ["Qual é o último livro da Bíblia?", ["Atos dos Apóstolos", "Judas", "Apocalipse", "Hebreus"], 2, "A Bíblia termina com o Apocalipse, atribuído a João."],
  ["Quantos livros formam o Pentateuco?", ["3", "5", "7", "12"], 1, "O Pentateuco tem 5 livros: Gênesis, Êxodo, Levítico, Números e Deuteronômio."],
  ["Quantos Salmos tem o livro dos Salmos?", ["50", "100", "150", "200"], 2, "O livro dos Salmos reúne 150 orações e cânticos."],
  ["Qual livro da Bíblia conta a saída do povo de Israel do Egito?", ["Gênesis", "Êxodo", "Levítico", "Josué"], 1, "Êxodo quer dizer \"saída\": narra a libertação do Egito."],
  // --- Antigo Testamento: criação e patriarcas
  ["Em quantos dias Deus criou o mundo, segundo o Gênesis, antes de descansar?", ["3", "6", "7", "12"], 1, "Deus criou em seis dias e descansou no sétimo (Gn 1–2)."],
  ["Quem foram o primeiro homem e a primeira mulher?", ["Abraão e Sara", "Adão e Eva", "Noé e Naama", "Isaac e Rebeca"], 1, "Adão e Eva, criados por Deus no jardim do Éden (Gn 2–3)."],
  ["Qual dos filhos de Adão e Eva matou o próprio irmão?", ["Sete", "Caim", "Abel", "Enoque"], 1, "Caim matou Abel (Gn 4)."],
  ["Quem construiu a arca para escapar do dilúvio?", ["Moisés", "Noé", "Abraão", "Jacó"], 1, "Deus mandou Noé construir a arca (Gn 6–9)."],
  ["Quem é chamado de \"pai da fé\"?", ["Davi", "Abraão", "Moisés", "Elias"], 1, "Abraão confiou em Deus e partiu sem saber para onde ia (Gn 12)."],
  ["Qual era o nome do filho prometido a Abraão e Sara?", ["Ismael", "Isaac", "Esaú", "José"], 1, "Isaac, nascido quando Abraão e Sara já eram idosos (Gn 21)."],
  ["Quantas tribos de Israel vieram dos filhos de Jacó?", ["7", "10", "12", "40"], 2, "Jacó, chamado Israel, teve 12 filhos, origem das 12 tribos."],
  ["Qual filho de Jacó foi vendido pelos irmãos e depois chegou a governador do Egito?", ["Judá", "Benjamim", "José", "Levi"], 2, "José do Egito perdoou os irmãos e salvou a família da fome (Gn 37–50)."],
  // --- Êxodo e Moisés
  ["Quem recebeu de Deus os Dez Mandamentos no monte Sinai?", ["Josué", "Moisés", "Aarão", "Samuel"], 1, "Deus entregou as tábuas da Lei a Moisés (Ex 20)."],
  ["Qual foi a primeira praga do Egito?", ["Rãs", "Água transformada em sangue", "Gafanhotos", "Trevas"], 1, "A primeira praga foi o Nilo virando sangue (Ex 7)."],
  ["Que alimento Deus mandou do céu para o povo no deserto?", ["Codornizes só", "Maná", "Pão de trigo", "Mel"], 1, "O maná caía do céu a cada manhã (Ex 16)."],
  ["Quantos anos o povo de Israel ficou no deserto antes de entrar na Terra Prometida?", ["7", "12", "40", "70"], 2, "Foram 40 anos de peregrinação."],
  ["Quem levou o povo para a Terra Prometida depois de Moisés?", ["Davi", "Josué", "Caleb", "Gedeão"], 1, "Josué sucedeu Moisés e atravessou o Jordão."],
  // --- Josué, Juízes, Rute, Samuel, Reis
  ["O que aconteceu com as muralhas de Jericó, no livro de Josué?", ["Foram escaladas à noite", "Caíram depois que o povo marchou e tocou as trombetas", "Foram queimadas", "Foram abertas por traição"], 1, "Os israelitas marcharam em volta da cidade e as muralhas caíram (Js 6)."],
  ["Qual juiz de Israel era conhecido pela grande força?", ["Gedeão", "Sansão", "Otoniel", "Jefté"], 1, "Sansão, do livro de Juízes (Jz 13–16)."],
  ["Qual mulher foi juíza e profetisa e liderou Israel junto com Barac?", ["Rute", "Ester", "Débora", "Judite"], 2, "Débora é a única mulher entre os juízes (Jz 4–5)."],
  ["Com quantos homens Gedeão venceu os madianitas?", ["300", "3.000", "12", "1.000"], 0, "Deus reduziu o exército a 300 homens (Jz 7)."],
  ["De que povo era Rute, a bisavó do rei Davi?", ["Egípcio", "Moabita", "Filisteu", "Babilônico"], 1, "Rute era moabita e ficou fiel à sogra Noemi."],
  ["Quem foi o primeiro rei de Israel?", ["Davi", "Saul", "Salomão", "Samuel"], 1, "Saul foi ungido pelo profeta Samuel (1Sm 10)."],
  ["Quem derrotou o gigante Golias?", ["Saul", "Davi", "Jonatas", "Sansão"], 1, "O jovem pastor Davi, com uma funda e uma pedra (1Sm 17)."],
  ["Qual rei de Israel ficou famoso pela sabedoria e construiu o Templo de Jerusalém?", ["Davi", "Salomão", "Ezequias", "Josias"], 1, "Salomão, filho de Davi (1Rs 3–8)."],
  // --- Profetas
  ["Qual profeta foi levado ao céu num carro de fogo?", ["Eliseu", "Elias", "Isaías", "Jeremias"], 1, "Elias foi arrebatado num redemoinho com carro de fogo (2Rs 2)."],
  ["Qual profeta passou três dias dentro de um grande peixe?", ["Jonas", "Daniel", "Oseias", "Joel"], 0, "Jonas, enviado para pregar em Nínive (Jn 1–2)."],
  ["Para qual cidade Deus enviou Jonas a pregar?", ["Babilônia", "Nínive", "Jerusalém", "Tiro"], 1, "Jonas foi a Nínive, que se converteu."],
  ["Qual profeta foi lançado na cova dos leões?", ["Daniel", "Ezequiel", "Amós", "Miqueias"], 0, "Daniel foi salvo por Deus na cova dos leões (Dn 6)."],
  ["Qual profeta ouviu a voz de Deus: \"A quem enviarei?\" e respondeu: \"Eis-me aqui, envia-me\"?", ["Isaías", "Jeremias", "Amós", "Naum"], 0, "Isaías, na visão do Templo (Is 6)."],
  ["Qual profeta viu o vale de ossos secos voltar à vida?", ["Ezequiel", "Isaías", "Daniel", "Habacuc"], 0, "Ezequiel (Ez 37)."],
  ["Qual profeta ungiu Davi como rei?", ["Natã", "Samuel", "Elias", "Eliseu"], 1, "Samuel ungiu Davi ainda jovem, em Belém (1Sm 16)."],
  ["No Monte Carmelo, qual profeta desafiou os profetas de Baal?", ["Elias", "Jeremias", "Oseias", "Joel"], 0, "Elias (1Rs 18)."],
  ["Quem foram os três jovens lançados na fornalha ardente e salvos por Deus?", ["Sidrac, Misac e Abdênago", "Pedro, Tiago e João", "Sem, Cam e Jafé", "Gad, Aser e Dã"], 0, "Sidrac, Misac e Abdênago, no livro de Daniel (Dn 3)."],
  ["Qual personagem perdeu tudo, mas continuou fiel a Deus?", ["Jó", "Tobias", "Judite", "Jeremias"], 0, "Jó, no livro que leva o seu nome."],
  ["Qual rainha arriscou a vida para salvar seu povo, no livro que leva seu nome?", ["Ester", "Rute", "Judite", "Débora"], 0, "Ester, rainha da Pérsia."],
  ["Qual arcanjo acompanhou o jovem Tobias na viagem?", ["Gabriel", "Rafael", "Miguel", "Uriel"], 1, "Rafael (nome que significa \"Deus cura\"), no livro de Tobias."],
  // --- Evangelhos: nascimento e vida de Jesus
  ["Qual arcanjo anunciou a Maria que ela seria a mãe de Jesus?", ["Miguel", "Rafael", "Gabriel", "Uriel"], 2, "O anjo Gabriel, na Anunciação (Lc 1,26-38)."],
  ["Em qual cidade Jesus nasceu?", ["Nazaré", "Belém", "Jerusalém", "Cafarnaum"], 1, "Jesus nasceu em Belém da Judeia."],
  ["Em qual cidade Jesus cresceu?", ["Belém", "Nazaré", "Caná", "Jericó"], 1, "Jesus cresceu em Nazaré, na Galileia."],
  ["Quem batizou Jesus no rio Jordão?", ["Pedro", "João Batista", "Tiago", "Elias"], 1, "João Batista batizou Jesus (Mt 3)."],
  ["Quantos dias Jesus jejuou no deserto?", ["7", "12", "40", "70"], 2, "Jesus jejuou 40 dias e 40 noites (Mt 4)."],
  ["Qual foi o primeiro milagre de Jesus, segundo o Evangelho de João?", ["Multiplicar os pães", "Transformar água em vinho nas Bodas de Caná", "Curar um cego", "Ressuscitar Lázaro"], 1, "Nas Bodas de Caná, na Galileia (Jo 2,1-11)."],
  ["Nas Bodas de Caná, quem avisou Jesus de que o vinho tinha acabado?", ["Pedro", "Maria, sua mãe", "João", "O noivo"], 1, "Maria disse: \"Eles não têm mais vinho\" e orientou os serventes: \"Façam o que ele disser\"."],
  ["Quantos apóstolos Jesus escolheu?", ["7", "10", "12", "72"], 2, "Jesus escolheu os Doze."],
  ["Quantos pães e quantos peixes Jesus multiplicou na multiplicação mais conhecida?", ["5 pães e 2 peixes", "7 pães e 3 peixes", "12 pães e 5 peixes", "2 pães e 5 peixes"], 0, "Cinco pães e dois peixes alimentaram cerca de cinco mil homens (Mt 14)."],
  ["Qual amigo de Jesus, de Betânia, foi ressuscitado por Ele?", ["Lázaro", "Zaqueu", "Bartimeu", "Nicodemos"], 0, "Lázaro, irmão de Marta e Maria (Jo 11)."],
  ["Qual cobrador de impostos subiu numa árvore para ver Jesus?", ["Mateus", "Zaqueu", "Levi", "Nicodemos"], 1, "Zaqueu, em Jericó (Lc 19)."],
  // --- Mateus e Sermão da Montanha
  ["Qual Evangelho traz o Sermão da Montanha com as Bem-aventuranças?", ["Mateus", "Marcos", "Lucas", "João"], 0, "As Bem-aventuranças estão em Mateus 5 (Lucas tem uma versão mais curta)."],
  ["Qual profissão Mateus tinha antes de seguir Jesus?", ["Pescador", "Cobrador de impostos", "Carpinteiro", "Médico"], 1, "Mateus, também chamado Levi, era publicano (Mt 9,9)."],
  ["Qual oração Jesus ensinou aos discípulos e aparece no Sermão da Montanha, em Mateus?", ["Ave-Maria", "Pai-Nosso", "Glória ao Pai", "Creio em Deus Pai"], 1, "O Pai-Nosso, em Mateus 6,9-13."],
  ["Quantas são as Bem-aventuranças de Mateus 5?", ["3", "8", "10", "12"], 1, "São oito, a partir de \"Bem-aventurados os pobres em espírito\"."],
  // --- Marcos, Lucas, João
  ["Qual evangelista era médico?", ["Marcos", "Lucas", "João", "Mateus"], 1, "Paulo chama Lucas de \"o médico amado\" (Cl 4,14)."],
  ["Qual Evangelho traz a parábola do Filho Pródigo?", ["Lucas", "Mateus", "Marcos", "João"], 0, "A parábola está em Lucas 15."],
  ["Qual Evangelho traz a parábola do Bom Samaritano?", ["Lucas", "Mateus", "Marcos", "João"], 0, "Lucas 10,25-37."],
  ["Quem escreveu o Evangelho que começa com \"No princípio era o Verbo\"?", ["Mateus", "Marcos", "Lucas", "João"], 3, "O Evangelho de João."],
  ["Qual é o mais curto dos quatro Evangelhos?", ["Marcos", "Mateus", "Lucas", "João"], 0, "O Evangelho de Marcos."],
  ["Quem foi a primeira pessoa a ver Jesus ressuscitado, segundo o Evangelho de João?", ["Pedro", "Maria Madalena", "Tomé", "João"], 1, "Maria Madalena, junto ao túmulo (Jo 20)."],
  ["Qual apóstolo disse que só acreditaria na ressurreição se visse e tocasse as chagas?", ["Pedro", "André", "Tomé", "Filipe"], 2, "Tomé (Jo 20,24-29)."],
  ["Qual apóstolo negou Jesus três vezes antes de o galo cantar?", ["João", "Pedro", "Tiago", "André"], 1, "Pedro negou Jesus na noite da prisão."],
  ["Qual apóstolo traiu Jesus?", ["Judas Iscariotes", "Tomé", "Mateus", "Filipe"], 0, "Judas Iscariotes entregou Jesus por trinta moedas de prata."],
  ["Quem foi escolhido para ocupar o lugar de Judas entre os Doze?", ["Barnabé", "Matias", "Silas", "Estêvão"], 1, "Matias (At 1,26)."],
  ["Em que festa Jesus entrou em Jerusalém montado num jumentinho, aclamado pela multidão?", ["Domingo de Ramos", "Pentecostes", "Corpus Christi", "Epifania"], 0, "É o Domingo de Ramos, que abre a Semana Santa."],
  ["Em que monte Jesus foi crucificado?", ["Sinai", "Calvário (Gólgota)", "Carmelo", "Tabor"], 1, "Jesus foi crucificado no Calvário, também chamado Gólgota."],
  // --- Atos e cartas
  ["Quem escreveu os Atos dos Apóstolos?", ["Paulo", "Pedro", "Lucas", "Tiago"], 2, "Lucas, o mesmo autor do terceiro Evangelho."],
  ["Quem foi o primeiro mártir cristão, apedrejado em Jerusalém?", ["Estêvão", "Tiago", "Pedro", "Barnabé"], 0, "Santo Estêvão (At 7)."],
  ["Em qual festa o Espírito Santo desceu sobre os apóstolos, em línguas de fogo?", ["Páscoa", "Pentecostes", "Natal", "Epifania"], 1, "Em Pentecostes (At 2)."],
  ["No caminho para qual cidade Saulo (Paulo) se converteu?", ["Roma", "Damasco", "Antioquia", "Atenas"], 1, "Saulo viu Jesus no caminho de Damasco (At 9)."],
  ["De qual cidade era Paulo?", ["Tarso", "Jerusalém", "Roma", "Corinto"], 0, "Paulo nasceu em Tarso, na Cilícia."],
  ["Qual carta de Paulo diz: \"O amor é paciente, o amor é bondoso\"?", ["1 Coríntios", "Romanos", "Gálatas", "Filipenses"], 0, "É o hino à caridade, em 1 Coríntios 13."],
  ["Qual carta do Novo Testamento afirma que \"a fé sem obras é morta\"?", ["Tiago", "Romanos", "Hebreus", "Judas"], 0, "Carta de Tiago, capítulo 2."],
  ["Qual escravo fugitivo é o assunto da carta de Paulo a Filêmon?", ["Onésimo", "Timóteo", "Tito", "Silas"], 0, "Paulo pede que Filêmon receba Onésimo como irmão."],
  ["Quantas cartas de Pedro estão no Novo Testamento?", ["1", "2", "3", "4"], 1, "Primeira e Segunda Carta de Pedro."],
  ["Quantas cartas de João estão no Novo Testamento?", ["1", "2", "3", "4"], 2, "Primeira, Segunda e Terceira Carta de João."],
  ["Em qual ilha João recebeu as visões do Apocalipse?", ["Creta", "Patmos", "Malta", "Chipre"], 1, "Na ilha de Patmos (Ap 1,9)."],
  ["Para quantas igrejas o Apocalipse envia cartas no começo?", ["3", "7", "12", "10"], 1, "Para as sete igrejas da Ásia (Ap 2–3)."],
  ["Qual carta de Paulo foi escrita aos cristãos da capital do Império?", ["Romanos", "Efésios", "Colossenses", "Tessalonicenses"], 0, "A Carta aos Romanos."],
];

export const bancoBiblia = B.map(([pergunta, opcoes, certa, explicacao]) => ({
  pergunta,
  opcoes,
  certa,
  explicacao,
}));

// Embaralha as opções pra a certa não ficar sempre na mesma posição.
export function sortearOpcoes(item) {
  const ordem = item.opcoes.map((_, i) => i).sort(() => Math.random() - 0.5);
  return {
    pergunta: item.pergunta,
    opcoes: ordem.map((i) => item.opcoes[i]),
    resposta_correta: ordem.indexOf(item.certa),
    explicacao: item.explicacao,
  };
}
