import { ComingSoon } from "../../components/ui/ComingSoon";

export function QuizPage() {
  return (
    <ComingSoon title="Quiz católico" phase="Fase 2">
      <p>
        A <strong>chave de ouro</strong> do Adonai. Aqui você vai criar uma conta, responder
        perguntas de Bíblia e de fé católica e subir no <strong>ranking</strong>.
      </p>
      <ul>
        <li>Cadastro e login com perfil e pontuação</li>
        <li>Ranking geral e entre amigos do grupo</li>
        <li>Dificuldade que cresce conforme você acerta</li>
        <li>Perguntas que não se repetem — banco curado + geração assistida por IA</li>
        <li>Explicação com a fonte depois de cada resposta</li>
      </ul>
      <p>
        Precisa de um servidor com banco de dados (contas e ranking). Vamos começar pelo plano
        gratuito e crescer conforme o uso.
      </p>
    </ComingSoon>
  );
}
