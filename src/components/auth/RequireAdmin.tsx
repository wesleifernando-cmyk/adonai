import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/auth/AuthContext";

export function RequireAdmin() {
  const { usuario, isAdmin, carregando } = useAuth();

  if (carregando) return null;
  if (!usuario) return <Navigate to="/entrar" state={{ de: "/admin" }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
