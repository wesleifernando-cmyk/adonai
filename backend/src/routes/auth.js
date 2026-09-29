import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/pool.js";
import { assinaturaAtivaPara } from "../services/assinatura.js";

const router = Router();

function segredoJwt() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado.");
  }
  return process.env.JWT_SECRET;
}

export function gerarToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, segredoJwt(), { expiresIn: "30d" });
}

// Lê o usuário logado a partir do header Authorization: Bearer <token>.
// Não bloqueia a rota se não tiver token — quem chama decide o que fazer.
export function usuarioOpcional(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    try {
      req.usuario = jwt.verify(token, segredoJwt());
    } catch {
      req.usuario = null;
    }
  }
  next();
}

export function exigirLogin(req, res, next) {
  usuarioOpcional(req, res, () => {
    if (!req.usuario) return res.status(401).json({ erro: "É preciso estar logado." });
    next();
  });
}

export function exigirAdmin(req, res, next) {
  exigirLogin(req, res, async () => {
    const [usuario] = await query(`SELECT admin FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (!usuario?.admin) return res.status(403).json({ erro: "Só administradores acessam isso." });
    next();
  });
}

router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !email.includes("@") || !senha || senha.length < 6) {
      return res.status(400).json({ erro: "Preencha nome, e-mail válido e senha com 6+ caracteres." });
    }

    const [existente] = await query(`SELECT id FROM usuarios WHERE email = $1`, [email]);
    if (existente) {
      return res.status(409).json({ erro: "Já existe uma conta com esse e-mail." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const [usuario] = await query(
      `INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email`,
      [nome, email, senhaHash]
    );
    await query(`INSERT INTO quiz_pontuacoes (usuario_id) VALUES ($1)`, [usuario.id]);

    res.status(201).json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(500).json({ erro: "Erro ao criar conta.", detalhe: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: "Informe e-mail e senha." });
    }

    const [usuario] = await query(
      `SELECT id, nome, email, senha_hash, bloqueado FROM usuarios WHERE email = $1`,
      [email]
    );
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }
    if (usuario.bloqueado) {
      return res.status(403).json({ erro: "Esta conta foi bloqueada. Fale com a administração." });
    }

    delete usuario.senha_hash;
    delete usuario.bloqueado;
    res.json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ erro: "Erro ao entrar.", detalhe: err.message });
  }
});

// Dados do usuário logado + se a assinatura dele está ativa (mesma
// tabela de pagamentos já usada pelo checkout, casando pelo e-mail).
router.get("/eu", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(
      `SELECT id, nome, email, admin, bloqueado, foto_url, idade FROM usuarios WHERE id = $1`,
      [req.usuario.id]
    );
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });
    if (usuario.bloqueado) {
      return res.status(403).json({ erro: "Esta conta foi bloqueada. Fale com a administração." });
    }

    res.json({ usuario, assinaturaAtiva: await assinaturaAtivaPara(usuario.email) });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar usuário.", detalhe: err.message });
  }
});

// Atualiza nome, idade e/ou foto do próprio perfil. A foto vem como
// data URL (base64) já redimensionada pequena no navegador — não
// precisamos de um serviço de armazenamento de arquivos separado.
router.patch("/perfil", exigirLogin, async (req, res) => {
  try {
    const { nome, idade, fotoBase64 } = req.body;

    if (idade !== undefined && idade !== null) {
      const idadeNum = Number(idade);
      if (!Number.isInteger(idadeNum) || idadeNum < 1 || idadeNum > 120) {
        return res.status(400).json({ erro: "Idade inválida." });
      }
    }
    if (fotoBase64 && (!fotoBase64.startsWith("data:image/") || fotoBase64.length > 700_000)) {
      return res.status(400).json({ erro: "Foto inválida ou grande demais." });
    }
    if (nome !== undefined && !nome.trim()) {
      return res.status(400).json({ erro: "Nome não pode ficar vazio." });
    }

    const [usuario] = await query(
      `UPDATE usuarios SET
         nome = COALESCE(NULLIF($1, ''), nome),
         idade = COALESCE($2, idade),
         foto_url = COALESCE($3, foto_url)
       WHERE id = $4
       RETURNING id, nome, email, admin, bloqueado, foto_url, idade`,
      [nome?.trim(), idade ?? null, fotoBase64 ?? null, req.usuario.id]
    );

    res.json({ usuario });
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).json({ erro: "Erro ao atualizar perfil.", detalhe: err.message });
  }
});

export default router;
