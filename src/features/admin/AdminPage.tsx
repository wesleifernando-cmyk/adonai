import { ComingSoon } from "../../components/ui/ComingSoon";

export function AdminPage() {
  return (
    <ComingSoon title="Administração" phase="Fase 2">
      <p>
        Área restrita para a equipe do grupo. Só quem tiver login de administrador entra aqui.
      </p>
      <ul>
        <li>Subir pregações (áudio) e dar título e data</li>
        <li>Criar álbuns de fotos (Desperta, domingos, missões, eventos)</li>
        <li>Publicar ou esconder conteúdo</li>
        <li>Revisar textos de santos e devocionais antes de irem ao ar</li>
        <li>Depois: cadastrar e revisar perguntas do quiz</li>
      </ul>
      <p>
        Login e permissões ficam no mesmo servidor do quiz. Nada é criado ainda — aguardando o
        print da tela de login que você vai mandar.
      </p>
    </ComingSoon>
  );
}
