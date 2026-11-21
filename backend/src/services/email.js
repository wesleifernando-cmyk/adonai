// Envio de e-mail pela API do Resend (https://resend.com) — sem SDK, só fetch,
// no mesmo padrão dos outros serviços. Sem RESEND_API_KEY o envio é pulado
// (o convite continua valendo e aparece na página do pedido).
export function emailConfigurado() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function enviarEmail({ para, assunto, html, texto }) {
  if (!emailConfigurado()) {
    console.warn("RESEND_API_KEY não configurada — e-mail não enviado para", para);
    return { enviado: false, motivo: "sem_chave" };
  }
  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Missão Adonai <onboarding@resend.dev>",
      to: [para],
      subject: assunto,
      html,
      text: texto,
      ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
    }),
  });
  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Resend respondeu ${resposta.status}: ${detalhe}`);
  }
  return { enviado: true };
}
