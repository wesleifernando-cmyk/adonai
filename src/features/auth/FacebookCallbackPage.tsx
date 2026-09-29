import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";

export function FacebookCallbackPage() {
  const { entrarComFacebook } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const jaTentou = useRef(false);

  useEffect(() => {
    if (jaTentou.current) return;
    jaTentou.current = true;

    const erroFacebook = params.get("error_description") || params.get("error");
    if (erroFacebook) {
      setErro(erroFacebook);
      return;
    }

    const code = params.get("code");
    if (!code) {
      setErro("Código de autorização não recebido do Facebook.");
      return;
    }

    entrarComFacebook(code)
      .then(() => navigate("/", { replace: true }))
      .catch((err) => setErro(err instanceof Error ? err.message : "Erro ao entrar com Facebook."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Sua conta" title="Entrando com Facebook…" />
      {erro ? (
        <p>{erro} — <a href="/entrar">voltar pra tela de entrar</a>.</p>
      ) : (
        <p>Só um instante…</p>
      )}
    </div>
  );
}
