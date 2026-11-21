import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/auth/AuthContext";

/** Só entra quem o administrador liberou para conferir ingressos. */
export function RequirePortaria() {
  const { usuario, podeConferir, carregando } = useAuth();

  if (carregando) return null;
  if (!usuario) return <Navigate to="/entrar" state={{ de: "/convite/conferir" }} replace />;
  if (!podeConferir) return <Navigate to="/convite" replace />;
  return <Outlet />;
}
