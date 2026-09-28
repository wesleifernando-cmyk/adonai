export type Promessa = {
  texto: string;
};

/** As 12 promessas que Jesus fez a Santa Margarida Maria Alacoque
 *  para quem é devoto do seu Sagrado Coração. */
export const promessas: Promessa[] = [
  { texto: "Eu lhes darei todas as graças necessárias ao seu estado de vida." },
  { texto: "Estabelecerei a paz em suas famílias." },
  { texto: "Eu os consolarei em todas as suas aflições." },
  { texto: "Serei seu refúgio seguro durante a vida e, sobretudo, na hora da morte." },
  { texto: "Derramarei abundantes bênçãos sobre todas as suas ações." },
  { texto: "Os pecadores encontrarão em meu Coração a fonte e o oceano infinito de misericórdia." },
  { texto: "As almas tíbias se tornarão fervorosas." },
  { texto: "As almas fervorosas subirão rapidamente a uma grande perfeição." },
  { texto: "Abençoarei as casas onde a imagem do meu Sagrado Coração for exposta e venerada." },
  { texto: "Darei aos sacerdotes o dom de tocar os corações mais endurecidos." },
  {
    texto:
      "As pessoas que propagarem esta devoção terão seu nome escrito em meu Coração, para nunca dele ser apagado.",
  },
  {
    texto:
      "Prometo, na excessiva misericórdia do meu Coração, que meu amor todo-poderoso concederá a todos os que comungarem na primeira sexta-feira de nove meses consecutivos a graça da penitência final: não morrerão em minha desgraça, nem sem receber os sacramentos, e meu Coração será seu refúgio seguro nesse último momento.",
    },
];

export const grandePromessa = promessas[11];
