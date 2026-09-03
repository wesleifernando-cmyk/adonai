import { ComingSoon } from "../../components/ui/ComingSoon";

export function NoticiasPage() {
  return (
    <ComingSoon title="Notícias da fé" phase="Fase 1.5">
      <p>
        Um lugar para acompanhar o que acontece na <strong>Igreja e no Vaticano</strong> e também
        aqui perto, no <strong>Vale do Paraíba</strong> e em Taubaté.
      </p>
      <ul>
        <li>Vaticano e Igreja no mundo — Vatican News (português)</li>
        <li>Igreja no Brasil — CNBB, ACI Digital</li>
        <li>Aqui do Vale — Santuário de Aparecida (A12) e Canção Nova, que ficam na região</li>
        <li>Cada notícia com título, resumo curto, data e link para a fonte original</li>
        <li>Nada de copiar a matéria inteira — sempre com crédito e link de volta</li>
      </ul>
      <p>
        Precisa de uma pequena função no servidor para ler as fontes (RSS) e atualizar sozinha.
        É barato e dá para fazer já no primeiro deploy.
      </p>
    </ComingSoon>
  );
}
