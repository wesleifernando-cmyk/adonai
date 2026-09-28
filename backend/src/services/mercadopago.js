// Fala com a API do Mercado Pago direto por fetch (sem precisar instalar
// SDK nenhum) — cria o link de pagamento (Checkout Pro, que já cobre PIX,
// cartão de crédito e débito sozinho, à vista) e consulta o status de um
// pagamento específico. Mesmo padrão usado no Próspero JB IA.

const MP_API = "https://api.mercadopago.com";

function token() {
  const t = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!t) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado no servidor.");
  return t;
}

// Cria uma "preferência" de pagamento — o Mercado Pago devolve um link
// (init_point) pra onde a pessoa é redirecionada pra pagar.
export async function criarPreferencia({ titulo, precoCentavos, email, urlFrontend, urlBackend, referenciaExterna }) {
  const resposta = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({
      items: [
        {
          title: titulo,
          quantity: 1,
          currency_id: "BRL",
          unit_price: precoCentavos / 100,
        },
      ],
      // Guarda o e-mail de quem está pagando, pra recuperar no webhook
      // depois que o pagamento for aprovado.
      external_reference: referenciaExterna,
      payer: email ? { email } : undefined,
      back_urls: {
        success: `${urlFrontend}/pagamento-confirmado`,
        failure: `${urlFrontend}/ajude?pagamento=falhou`,
        pending: `${urlFrontend}/ajude?pagamento=pendente`,
      },
      auto_return: "approved",
      notification_url: `${urlBackend}/pagamentos/webhook`,
    }),
  });
  const dados = await resposta.json();
  if (dados.error) throw new Error(dados.message || "Erro ao criar pagamento no Mercado Pago.");
  return dados;
}

// Busca os detalhes de um pagamento específico pra confirmar se foi
// realmente aprovado antes de liberar o acesso.
export async function buscarPagamento(paymentId) {
  const resposta = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return resposta.json();
}
