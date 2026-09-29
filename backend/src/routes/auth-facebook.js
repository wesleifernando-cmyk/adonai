import { Router } from "express";
import bcrypt from "bcryptjs";
import { query } from "../db/pool.js";
import { gerarToken } from "./auth.js";

const router = Router();

const VERSAO_API = "v21.0";

function urlRedirect() {
  const base = process.env.FRONTEND_URL || "http://localhost:5175";
  return `${base}/auth/instagram/callback`;
}

// Troca o "code" que o Facebook devolveu no redirect por um access
// token, e depois busca nome/e-mail/foto do perfil da pessoa.
async function buscarPerfilFacebook(code) {
  const paramsToken = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID,
    client_secret: process.env.INSTAGRAM_APP_SECRET,
    redirect_uri: urlRedirect(),
    code,
  });
  const respToken = await fetch(`https://graph.facebook.com/${VERSAO_API}/oauth/access_token?${paramsToken}`);
  const dadosToken = await respToken.json();
  if (!respToken.ok || !dadosToken.access_token) {
    throw new Error(dadosToken.error?.message || "Não foi possível confirmar o login com o Facebook.");
  }

  const paramsPerfil = new URLSearchParams({
    fields: "id,name,email,picture.type(large)",
    access_token: dadosToken.access_token,
  });
  const respPerfil = await fetch(`https://graph.facebook.com/me?${paramsPerfil}`);
  const perfil = await respPerfil.json();
  if (!respPerfil.ok || !perfil.id) {
    throw new Error(perfil.error?.message || "Não foi possível ler o perfil do Facebook.");
  }

  return {
    facebookId: perfil.id,
    nome: perfil.name || "Membro Adonai",
    email: perfil.email || null,
    fotoUrl: perfil.picture?.data?.url || null,
  };
}

router.post("/callback", async (req, res) => {
  try {
    if (!process.env.INSTAGRAM_APP_ID || !process.env.INSTAGRAM_APP_SECRET) {
      return res.status(500).json({ erro: "Login com Facebook ainda não está configurado no servidor." });
    }
    const { code } = req.body;
    if (!code) return res.status(400).json({ erro: "Código de autorização ausente." });

    const perfil = await buscarPerfilFacebook(code);

    // Já existe conta ligada a esse Facebook? Se não, tenta casar pelo
    // e-mail (pra quem já tinha criado conta com e-mail/senha antes) —
    // senão cria uma conta nova.
    let [usuario] = await query(
      `SELECT id, nome, email, admin, bloqueado, foto_url FROM usuarios WHERE facebook_id = $1`,
      [perfil.facebookId]
    );

    if (!usuario && perfil.email) {
      [usuario] = await query(
        `SELECT id, nome, email, admin, bloqueado, foto_url FROM usuarios WHERE email = $1`,
        [perfil.email]
      );
      if (usuario) {
        await query(`UPDATE usuarios SET facebook_id = $1, foto_url = COALESCE(foto_url, $2) WHERE id = $3`, [
          perfil.facebookId,
          perfil.fotoUrl,
          usuario.id,
        ]);
      }
    }

    if (!usuario) {
      const emailConta = perfil.email || `fb${perfil.facebookId}@sem-email.adonai`;
      const senhaAleatoria = await bcrypt.hash(`${perfil.facebookId}-${Date.now()}-${Math.random()}`, 10);
      [usuario] = await query(
        `INSERT INTO usuarios (nome, email, senha_hash, facebook_id, foto_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, email, admin, bloqueado, foto_url`,
        [perfil.nome, emailConta, senhaAleatoria, perfil.facebookId, perfil.fotoUrl]
      );
      await query(`INSERT INTO quiz_pontuacoes (usuario_id) VALUES ($1)`, [usuario.id]);
    }

    if (usuario.bloqueado) {
      return res.status(403).json({ erro: "Esta conta foi bloqueada. Fale com a administração." });
    }

    delete usuario.bloqueado;
    res.json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    console.error("Erro no login com Facebook:", err);
    res.status(500).json({ erro: "Erro ao entrar com Facebook.", detalhe: err.message });
  }
});

export default router;
