// O App ID não é segredo — é público (aparece na própria URL de login
// do Facebook). O App Secret nunca aparece aqui, só no backend.
const FACEBOOK_APP_ID = "1543427534255644";
const VERSAO_API = "v21.0";

export function urlLoginFacebook() {
  const redirectUri = `${window.location.origin}/auth/instagram/callback`;
  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: redirectUri,
    scope: "public_profile,email",
    response_type: "code",
  });
  return `https://www.facebook.com/${VERSAO_API}/dialog/oauth?${params}`;
}
