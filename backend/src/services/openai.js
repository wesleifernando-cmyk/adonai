// Wrapper fino sobre a Chat Completions API da OpenAI — sem SDK,
// mesmo padrão usado no serviço do Mercado Pago (fetch puro).
const MODELO = "gpt-4o-mini";

function chaveApi() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada no servidor.");
  }
  return process.env.OPENAI_API_KEY;
}

/**
 * Pede uma resposta em JSON pro modelo, forçando o formato via
 * response_format. `mensagens` segue o formato { role, content }[].
 */
export async function perguntarJson(mensagens, { temperatura = 0.9 } = {}) {
  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chaveApi()}`,
    },
    body: JSON.stringify({
      model: MODELO,
      messages: mensagens,
      temperature: temperatura,
      response_format: { type: "json_object" },
    }),
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`OpenAI respondeu ${resposta.status}: ${detalhe}`);
  }

  const dados = await resposta.json();
  const texto = dados.choices?.[0]?.message?.content;
  if (!texto) throw new Error("OpenAI não retornou conteúdo.");
  return JSON.parse(texto);
}

/** Pede uma resposta em texto simples (sem forçar JSON). */
export async function perguntarTexto(mensagens, { temperatura = 0.5 } = {}) {
  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chaveApi()}`,
    },
    body: JSON.stringify({
      model: MODELO,
      messages: mensagens,
      temperature: temperatura,
    }),
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`OpenAI respondeu ${resposta.status}: ${detalhe}`);
  }

  const dados = await resposta.json();
  const texto = dados.choices?.[0]?.message?.content;
  if (!texto) throw new Error("OpenAI não retornou conteúdo.");
  return texto.trim();
}
