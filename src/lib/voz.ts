// Fala e reconhecimento de voz do navegador (Web Speech API). Sem
// custo, sem servidor — mas o reconhecimento de voz (falar a pergunta)
// só existe em Chrome/Android; no Safari/iPhone não tem suporte ainda,
// então o microfone só aparece quando o navegador sabe fazer isso.
// A leitura em voz alta (ouvir a resposta) tem suporte bem mais amplo.

function construtorReconhecimento(): any {
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function reconhecimentoDisponivel() {
  return Boolean(construtorReconhecimento());
}

export function sinteseDisponivel() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Escuta uma fala e devolve o texto reconhecido (ou erro) por callback. */
export function ouvirFala(aoResultado: (texto: string) => void, aoErro: (msg: string) => void) {
  const Construtor = construtorReconhecimento();
  if (!Construtor) {
    aoErro("Esse navegador não sabe transformar fala em texto.");
    return () => {};
  }

  const reconhecimento = new Construtor();
  reconhecimento.lang = "pt-BR";
  reconhecimento.interimResults = false;
  reconhecimento.maxAlternatives = 1;

  reconhecimento.onresult = (evento: any) => {
    const texto = evento.results?.[0]?.[0]?.transcript;
    if (texto) aoResultado(texto);
  };
  reconhecimento.onerror = (evento: any) => {
    aoErro(evento.error === "not-allowed" ? "Permissão de microfone negada." : "Não entendi, tenta de novo.");
  };

  reconhecimento.start();
  return () => reconhecimento.stop();
}

export function falarEmVoz(texto: string) {
  if (!sinteseDisponivel()) return;
  window.speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  window.speechSynthesis.speak(fala);
}

export function pararDeFalar() {
  if (sinteseDisponivel()) window.speechSynthesis.cancel();
}
