import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth/AuthContext";

/**
 * Guarda as rotas de "Explorar a fé" pra baixo: sem login manda pra
 * /entrar, logado mas sem assinatura paga manda pra /assinar. Ambos
 * guardam de onde a pessoa veio pra devolver ela lá depois.
 */
export function RequireAcesso() {
  const { usuario, assinaturaAtiva, carregando } = useAuth();
  const location = useLocation();

  if (carregando) return null;

  if (!usuario) {
    return <Navigate to="/entrar" state={{ de: location.pathname }} replace />;
  }
  if (!assinaturaAtiva) {
    return <Navigate to="/assinar" state={{ de: location.pathname }} replace />;
  }
  return <Outlet />;
}
