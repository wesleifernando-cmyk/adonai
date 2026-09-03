import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import styles from "./QuizPage.module.css";

export function QuizPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fase 2"
        title="Quiz católico"
        lead="A chave de ouro do Adonai: cria sua conta, responde perguntas de Bíblia e de fé católica e sobe no ranking."
      />

      <div className={styles.login} aria-hidden="true">
        <p className="eyebrow">Entrar na Missão</p>
        <div className={styles.field}><span>E-mail ou telefone</span></div>
        <div className={styles.field}><span>Senha</span></div>
        <button type="button" className={styles.btn} disabled>Entrar</button>
        <button type="button" className={styles.btnGhost} disabled>Criar conta / Cadastre-se</button>
        <p className={styles.loginNote}>Prévia da tela — o login funciona na Fase 2.</p>
      </div>

      <div className={styles.bloco}>
        <h2 className={styles.blocoTitulo}>Como vai funcionar</h2>
        <ul className={styles.lista}>
          <li>Cadastro e login com perfil e pontuação</li>
          <li>Ranking geral e entre amigos da missão</li>
          <li>Dificuldade que cresce conforme você acerta</li>
          <li>Perguntas que não se repetem — banco curado + geração assistida por IA</li>
          <li>Explicação com a fonte depois de cada resposta</li>
        </ul>
        <p className={styles.blocoTexto}>
          Precisa de um servidor com banco de dados (contas e ranking). Vamos começar pelo plano
          gratuito e crescer conforme o uso.
        </p>
      </div>

      <Link to="/" className={styles.voltar}>← Voltar para Hoje</Link>
    </div>
  );
}
