// Gera uma imagem (canvas) com o resultado do quiz da pessoa, pronta
// pra compartilhar nas redes — sem precisar de servidor pra isso.

type DadosRank = {
  nome: string;
  pontos: number;
  perguntaAtual: number;
};

const LARGURA = 1080;
const ALTURA = 1350;

function quebrarLinha(ctx: CanvasRenderingContext2D, texto: string, larguraMax: number): string[] {
  const palavras = texto.split(" ");
  const linhas: string[] = [];
  let atual = "";
  for (const palavra of palavras) {
    const teste = atual ? `${atual} ${palavra}` : palavra;
    if (ctx.measureText(teste).width > larguraMax && atual) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = teste;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

export async function gerarImagemRank({ nome, pontos, perguntaAtual }: DadosRank): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas não suportado neste navegador.");

  // fundo escuro com um brilho de fogo no topo
  const fundo = ctx.createLinearGradient(0, 0, 0, ALTURA);
  fundo.addColorStop(0, "#3a0f04");
  fundo.addColorStop(0.4, "#0a0a0b");
  fundo.addColorStop(1, "#0a0a0b");
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  ctx.textAlign = "center";

  // marca
  ctx.fillStyle = "#f6f2ec";
  ctx.font = "700 46px Georgia, serif";
  ctx.fillText("A D O N A I", LARGURA / 2, 140);

  ctx.fillStyle = "#b3aaa1";
  ctx.font = "28px Georgia, serif";
  ctx.fillText("Quiz católico", LARGURA / 2, 190);

  // nome
  ctx.fillStyle = "#f6f2ec";
  ctx.font = "600 44px Georgia, serif";
  ctx.fillText(nome, LARGURA / 2, 340);

  // número grande da pergunta
  const grad = ctx.createLinearGradient(0, 380, 0, 620);
  grad.addColorStop(0, "#ff5a2c");
  grad.addColorStop(1, "#8a0f04");
  ctx.fillStyle = grad;
  ctx.font = "800 220px Georgia, serif";
  ctx.fillText(String(perguntaAtual), LARGURA / 2, 640);

  ctx.fillStyle = "#e4321a";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText("já chegou até a pergunta acima", LARGURA / 2, 700);

  // pontos
  ctx.fillStyle = "#f2b01e";
  ctx.font = "700 56px Georgia, serif";
  ctx.fillText(`${pontos} pontos`, LARGURA / 2, 800);

  // linha divisória
  ctx.strokeStyle = "rgba(247, 243, 238, 0.15)";
  ctx.beginPath();
  ctx.moveTo(140, 880);
  ctx.lineTo(LARGURA - 140, 880);
  ctx.stroke();

  // lema + convite
  ctx.fillStyle = "#f6f2ec";
  ctx.font = "italic 40px Georgia, serif";
  ctx.fillText("Grupo de oração Adonai", LARGURA / 2, 960);

  ctx.fillStyle = "#e4321a";
  ctx.font = "italic 700 46px Georgia, serif";
  ctx.fillText("Eu tenho para onde voltar.", LARGURA / 2, 1020);

  ctx.fillStyle = "#b3aaa1";
  ctx.font = "32px Georgia, serif";
  const linhasConvite = quebrarLinha(
    ctx,
    "Espero vocês todos os domingos às 19h30 — Comunidade de São José",
    LARGURA - 220
  );
  linhasConvite.forEach((linha, i) => {
    ctx.fillText(linha, LARGURA / 2, 1090 + i * 42);
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Erro ao gerar a imagem."))), "image/png");
  });
}

/** Compartilha (ou baixa, se o navegador não souber compartilhar arquivo) a imagem gerada. */
export async function compartilharImagemRank(dados: DadosRank) {
  const blob = await gerarImagemRank(dados);
  const arquivo = new File([blob], "meu-rank-adonai.png", { type: "image/png" });

  const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
  if (nav.share && nav.canShare?.({ files: [arquivo] })) {
    await nav.share({
      files: [arquivo],
      title: "Meu resultado no Quiz Adonai",
      text: "Eu tenho para onde voltar. 🔥",
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meu-rank-adonai.png";
  a.click();
  URL.revokeObjectURL(url);
}
