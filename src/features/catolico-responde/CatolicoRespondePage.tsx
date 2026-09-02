import { ComingSoon } from "../../components/ui/ComingSoon";

export function CatolicoRespondePage() {
  return (
    <ComingSoon title="Católico Responde" phase="Fase 3">
      <p>
        Um assistente que ajuda o católico a <strong>entender e defender a própria fé</strong>.
        Ele responde a partir do acervo do próprio app — Catecismo, santos, documentos da Igreja —
        e sempre mostra a fonte.
      </p>
      <ul>
        <li>Dúvidas sobre a fé católica explicadas com calma</li>
        <li>Respostas a objeções comuns, sem ofender ninguém</li>
        <li>Cada resposta com a referência (parágrafo do Catecismo, versículo, documento)</li>
        <li>Revisão de alguém com formação antes de liberar</li>
      </ul>
      <p>
        Usa um modelo de linguagem com busca no conteúdo do site. Tem custo por pergunta, então
        entra depois que o resto estiver de pé.
      </p>
    </ComingSoon>
  );
}
